type NetlifyEvent = {
  httpMethod: string;
  body: string | null;
};

type RequestBody = {
  prompt?: string;
  bookTitle?: string;
  bookSummary?: string;
  bookAnalysis?: string;
};

type UpstreamPayload = {
  message?: { content?: string };
  response?: string;
  choices?: Array<{ message?: { content?: string | Array<{ text?: string }> } }>;
  error?: { message?: string };
};

const json = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(body),
});

export const handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  const apiKey = process.env.OLLAMA_API_KEY;
  const model = process.env.OLLAMA_MODEL || 'gpt-oss:120b';
  const baseUrl = (process.env.OLLAMA_BASE_URL || 'https://api.ollama.com/v1').replace(/\/+$/, '');

  if (!apiKey) {
    return json(503, {
      error: 'The Strategist chat is coming soon on this deployment. Join the waitlist for launch updates.',
    });
  }

  let body: RequestBody;
  try {
    body = JSON.parse(event.body || '{}') as RequestBody;
  } catch {
    return json(400, { error: 'Invalid JSON request body.' });
  }

  const prompt = body.prompt?.trim();
  const bookTitle = body.bookTitle?.trim();
  const bookSummary = body.bookSummary?.trim() || '';
  const bookAnalysis = body.bookAnalysis?.trim() || '';

  if (!prompt || !bookTitle) {
    return json(400, { error: 'prompt and bookTitle are required.' });
  }

  const systemInstruction = `You are "The Strategist," an AI expert on Robert Greene's works.
You are currently acting as an expert on the book: "${bookTitle}".

Knowledge base for this session:
- Summary: ${bookSummary}
- Deep Analysis: ${bookAnalysis}
- General Greene Philosophy: strategic, historical, psychological, realistic.

Rules:
- Keep the response grounded in this book's ideas.
- If asked about other books, briefly mention them but return focus to "${bookTitle}".
- Be analytical, objective, and practical.
- Use Markdown formatting where useful.`;

  try {
    const useOpenAICompat = baseUrl.endsWith('/v1');
    const endpoint = useOpenAICompat ? `${baseUrl}/chat/completions` : `${baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`}/chat`;

    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: false,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const rawPayload = await upstream.text();
    let payload: UpstreamPayload = {};
    try {
      payload = JSON.parse(rawPayload || '{}') as UpstreamPayload;
    } catch {
      payload = {};
    }

    if (!upstream.ok) {
      const upstreamMessage = payload.error?.message || rawPayload || `upstream error (${upstream.status})`;
      const statusCode = upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
      console.error('strategist upstream error:', upstream.status, upstreamMessage);
      return json(statusCode, {
        error: `The Strategist is currently unavailable. Upstream details: ${upstream.status}: ${upstreamMessage}`,
      });
    }

    const openAIContent = payload.choices?.[0]?.message?.content;
    const openAIText =
      typeof openAIContent === 'string'
        ? openAIContent
        : Array.isArray(openAIContent)
          ? openAIContent.map((part) => part.text || '').join('')
          : '';
    const text = (payload.message?.content || payload.response || openAIText || '').trim();
    return json(200, { text: text || 'No response generated.' });
  } catch (error) {
    console.error('strategist function error:', error);
    return json(502, {
      error: 'The Strategist is currently unavailable. Check OLLAMA_API_KEY, OLLAMA_BASE_URL, and OLLAMA_MODEL.',
    });
  }
};
