// ─────────────────────────────────────────────────────────
// Groq API Client — Streaming Chat Completions
// Direct fetch to Groq's OpenAI-compatible endpoint
// ─────────────────────────────────────────────────────────

import { searchKnowledge, type KnowledgeChunk } from '../data/knowledgeBase';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

function getApiKey(): string {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  if (!key) {
    throw new Error('VITE_GROQ_API_KEY is not set. Add it to your .env file.');
  }
  return key;
}

function getModel(): string {
  return import.meta.env.VITE_GROQ_MODEL || 'openai/gpt-oss-120b';
}

export interface ChatMessage {
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

// ── Non-streaming chat (fallback) ──
export async function chatWithGroq(
  conversationHistory: ChatMessage[],
  userMessage: string,
): Promise<string> {
  const contextChunks = searchKnowledge(userMessage, 5);
  const systemPrompt = buildSystemPrompt(contextChunks);

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-6), // keep last 6 messages for context window
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: getModel(),
      messages,
      temperature: 0.6,
      max_tokens: 1024,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    if (response.status === 429) {
      throw new Error('Rate limit reached. Please wait a moment and try again.');
    }
    throw new Error(`Groq API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
}

// ── Streaming chat ──
export async function chatWithGroqStream(
  conversationHistory: ChatMessage[],
  userMessage: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: Error) => void,
): Promise<void> {
  const contextChunks = searchKnowledge(userMessage, 5);
  const systemPrompt = buildSystemPrompt(contextChunks);

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-6),
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: getModel(),
        messages,
        temperature: 0.6,
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      if (response.status === 429) {
        onError(new Error('Rate limit reached. Please wait a moment and try again.'));
        return;
      }
      onError(new Error(`Groq API error (${response.status}): ${errorBody}`));
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError(new Error('Failed to get response stream reader.'));
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // keep incomplete line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;
        if (!trimmed.startsWith('data: ')) continue;

        try {
          const json = JSON.parse(trimmed.slice(6));
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            onChunk(delta);
          }
        } catch {
          // skip malformed JSON lines
        }
      }
    }

    onDone();
  } catch (error) {
    onError(error instanceof Error ? error : new Error(String(error)));
  }
}
