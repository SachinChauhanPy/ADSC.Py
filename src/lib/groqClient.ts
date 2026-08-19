// ─────────────────────────────────────────────────────────
// Chat client — talks to our own /api/chat proxy.
//
// The Groq key is NOT read here. Anything in this file ships to the
// browser, so the key lives in api/chat.ts and never leaves the server.
// The proxy also builds the system prompt and runs the knowledge-base
// lookup, which is why neither appears in this file any more.
// ─────────────────────────────────────────────────────────

const CHAT_API_URL = '/api/chat';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function postChat(
  conversationHistory: ChatMessage[],
  userMessage: string,
  stream: boolean,
): Promise<Response> {
  return fetch(CHAT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // The proxy re-validates and trims this; sending the tail is just polite.
      history: conversationHistory.slice(-6),
      message: userMessage,
      stream,
    }),
  });
}

// The proxy always answers errors as { error: string }.
async function readError(response: Response): Promise<Error> {
  try {
    const data = await response.json();
    if (typeof data?.error === 'string') return new Error(data.error);
  } catch {
    // fall through to the generic message
  }
  return new Error(`Chat request failed (${response.status}).`);
}

// ── Non-streaming chat (fallback) ──
export async function chatWithGroq(
  conversationHistory: ChatMessage[],
  userMessage: string,
): Promise<string> {
  const response = await postChat(conversationHistory, userMessage, false);

  if (!response.ok) {
    throw await readError(response);
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
  try {
    const response = await postChat(conversationHistory, userMessage, true);

    if (!response.ok) {
      onError(await readError(response));
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
