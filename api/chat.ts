// ─────────────────────────────────────────────────────────
// Groq proxy — the API key stays on the server.
//
// The browser never sees GROQ_API_KEY, and it does not get to choose
// the system prompt either: the knowledge-base lookup and the guardrails
// below run here, so a hand-rolled POST cannot turn this endpoint into a
// general-purpose LLM on the community's quota.
// ─────────────────────────────────────────────────────────

import { searchKnowledge, type KnowledgeChunk } from '../src/data/knowledgeBase';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-oss-120b';

const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY_MESSAGES = 6;

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// ── System Prompt with strict guardrails ──
function buildSystemPrompt(contextChunks: KnowledgeChunk[]): string {
  const contextBlock = contextChunks
    .map(c => `[${c.category} — ${c.title}]\n${c.content}`)
    .join('\n\n---\n\n');

  return `You are **ADSC Bot**, the official AI assistant for **ADSC.Py** — the student-led Python developer community at Atmiya University, Rajkot.

## YOUR STRICT RULES:
1. You MUST ONLY answer questions related to the ADSC.Py community, its learning paths, sessions, projects, opportunities, maintainers, website navigation, and Python career guidance within the ADSC.Py ecosystem.
2. If a user asks a question NOT related to ADSC.Py (e.g., general math, cooking recipes, unrelated coding help, weather, politics, personal advice), you MUST politely decline and redirect them. Example: "I'm ADSC Bot — I can only help with ADSC.Py community topics! Try asking me about our learning paths, upcoming sessions, or how to join. 🐍"
3. NEVER fabricate information. If you don't know something, say so honestly and suggest the user check the website or contact the maintainers.
4. NEVER promise jobs, placements, or guaranteed employment. ADSC.Py helps with career readiness, not job guarantees.
5. NEVER invent fake member counts or fabricated testimonials.
6. Always refer to the community as "ADSC.Py" (exact casing).
7. When mentioning pages on the website, include the path (e.g., "Check out our Paths page at /paths").
8. ADSC.Py does NOT have a public Telegram group. Telegram is only used internally by core team maintainers. NEVER suggest users join a Telegram group. The only public communication channels for students are **Discord** and **WhatsApp**.
9. Do NOT invent or assume any communication channels, social media groups, or sign-up forms that are not explicitly mentioned in the knowledge base context below.

## RESPONSE FORMAT — VERY IMPORTANT:
Your responses are displayed inside a small chat widget (400px wide). You MUST follow these formatting rules strictly:
- Keep responses SHORT and CONCISE — 3 to 6 short paragraphs maximum.
- Use **bold** for emphasis on key terms and names.
- Use bullet points (- item) for lists. Keep each bullet to one short sentence.
- Use ### for section headings ONLY when listing multiple distinct categories (like different learning paths). Use sparingly — at most 1-2 per response.
- NEVER use markdown tables (| col | col |). Tables look completely broken in the chat. Convert any tabular data into bullet lists instead.
- NEVER use horizontal rules (---).
- NEVER use code blocks with triple backticks.
- Keep paragraphs to 1-2 sentences each.
- Use emojis sparingly (1-2 per response max) for warmth.
- When listing items with details, use this format:
  - **Item Name** — Short one-line description.

## KNOWLEDGE BASE CONTEXT:
Use the following verified information to answer the user's question. Base your answers ONLY on this context and the conversation history.

${contextBlock}

## TONE:
Be welcoming, practical, motivating, and student-friendly. Inclusive of beginners. Focused on collaboration over competition. Action-oriented and grounded.`;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not set in the environment.');
    return json({ error: 'Chat is not configured right now.' }, 503);
  }

  let body: { message?: unknown; history?: unknown; stream?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return json({ error: 'A message is required.' }, 400);
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return json({ error: 'That message is too long.' }, 413);
  }

  // Only user/assistant turns are accepted; the system turn is built here.
  const history: ChatMessage[] = Array.isArray(body.history)
    ? (body.history as unknown[])
        .filter((m): m is ChatMessage => {
          const turn = m as ChatMessage | null;
          return (
            !!turn &&
            (turn.role === 'user' || turn.role === 'assistant') &&
            typeof turn.content === 'string'
          );
        })
        .slice(-MAX_HISTORY_MESSAGES)
        .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
    : [];

  const stream = body.stream !== false;
  const messages: ChatMessage[] = [
    { role: 'system', content: buildSystemPrompt(searchKnowledge(message, 5)) },
    ...history,
    { role: 'user', content: message },
  ];

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || DEFAULT_MODEL,
        messages,
        temperature: 0.6,
        max_tokens: 1024,
        stream,
      }),
      signal: request.signal,
    });
  } catch (error) {
    if (request.signal.aborted) {
      return new Response(null, { status: 499 });
    }
    console.error('Groq request failed:', error);
    return json({ error: 'Could not reach the model provider.' }, 502);
  }

  // Never forward the upstream error body — it echoes the request back.
  if (!upstream.ok) {
    console.error(`Groq error ${upstream.status}: ${await upstream.text()}`);
    return upstream.status === 429
      ? json({ error: 'Rate limit reached. Please wait a moment and try again.' }, 429)
      : json({ error: 'The model provider returned an error.' }, 502);
  }

  if (!stream) {
    return new Response(upstream.body, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
