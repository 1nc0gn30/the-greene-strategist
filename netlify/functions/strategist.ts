type NetlifyEvent = {
  httpMethod: string;
  body: string | null;
  headers?: Record<string, string>;
};

type AIProvider = "openai" | "gemini" | "ollama";

type RequestBody = {
  prompt?: string;
  bookTitle?: string;
  bookSummary?: string;
  bookAnalysis?: string;
  provider?: AIProvider;
  apiKey?: string;
  model?: string;
  ollamaBaseUrl?: string;
};

type UpstreamPayload = {
  message?: { content?: string };
  response?: string;
  choices?: Array<{ message?: { content?: string | Array<{ text?: string }> } }>;
  error?: { message?: string };
};

type GeminiPayload = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: { message?: string };
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;

const ipCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry || now >= entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

const json = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

function asText(content: string | Array<{ text?: string }> | undefined): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((part) => part.text || "").join("");
  return "";
}

async function callOpenAI(apiKey: string, model: string, systemInstruction: string, prompt: string): Promise<string> {
  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt },
      ],
    }),
  });

  const rawPayload = await upstream.text();
  let payload: UpstreamPayload = {};
  try {
    payload = JSON.parse(rawPayload || "{}") as UpstreamPayload;
  } catch {
    payload = {};
  }

  if (!upstream.ok) {
    const upstreamMessage = payload.error?.message || rawPayload || `upstream error (${upstream.status})`;
    console.error("openai upstream error:", upstream.status, upstreamMessage);
    throw new Error("UpstreamError");
  }

  const text = asText(payload.choices?.[0]?.message?.content).trim();
  return text || "No response generated.";
}

async function callGemini(apiKey: string, model: string, systemInstruction: string, prompt: string): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    }),
  });

  const rawPayload = await upstream.text();
  let payload: GeminiPayload = {};
  try {
    payload = JSON.parse(rawPayload || "{}") as GeminiPayload;
  } catch {
    payload = {};
  }

  if (!upstream.ok) {
    const upstreamMessage = payload.error?.message || rawPayload || `upstream error (${upstream.status})`;
    console.error("gemini upstream error:", upstream.status, upstreamMessage);
    throw new Error("UpstreamError");
  }

  const text = (payload.candidates?.[0]?.content?.parts || []).map((part) => part.text || "").join("").trim();
  return text || "No response generated.";
}

async function callOllama(
  apiKey: string,
  model: string,
  systemInstruction: string,
  prompt: string,
  ollamaBaseUrl: string,
): Promise<string> {
  const baseUrl = (ollamaBaseUrl || "https://api.ollama.com/v1").replace(/\/+$/, "");
  const useOpenAICompat = baseUrl.endsWith("/v1");
  const endpoint = useOpenAICompat
    ? `${baseUrl}/chat/completions`
    : `${baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`}/chat`;

  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: false,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt },
      ],
    }),
  });

  const rawPayload = await upstream.text();
  let payload: UpstreamPayload = {};
  try {
    payload = JSON.parse(rawPayload || "{}") as UpstreamPayload;
  } catch {
    payload = {};
  }

  if (!upstream.ok) {
    const upstreamMessage = payload.error?.message || rawPayload || `upstream error (${upstream.status})`;
    console.error("ollama upstream error:", upstream.status, upstreamMessage);
    throw new Error("UpstreamError");
  }

  const openAIText = asText(payload.choices?.[0]?.message?.content);
  const text = (payload.message?.content || payload.response || openAIText || "").trim();
  return text || "No response generated.";
}

export default async (event: NetlifyEvent) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const clientIp = event.headers?.["x-nf-client-connection-ip"]
    || event.headers?.["x-forwarded-for"]?.split(",")[0]
    || "unknown";

  if (isRateLimited(clientIp.trim())) {
    return json(429, { error: "Rate limit exceeded. Please wait a moment before trying again." });
  }

  let body: RequestBody;
  try {
    body = JSON.parse(event.body || "{}") as RequestBody;
  } catch {
    return json(400, { error: "Invalid JSON request body." });
  }

  const prompt = body.prompt?.trim();
  const bookTitle = body.bookTitle?.trim();
  const bookSummary = body.bookSummary?.trim() || "";
  const bookAnalysis = body.bookAnalysis?.trim() || "";
  const provider = body.provider;
  const apiKey = body.apiKey?.trim() || "";
  const model = body.model?.trim() || "";
  const ollamaBaseUrl = body.ollamaBaseUrl?.trim() || "https://api.ollama.com/v1";

  if (!prompt || !bookTitle) {
    return json(400, { error: "prompt and bookTitle are required." });
  }

  if (prompt.length > 2000) {
    return json(400, { error: "Prompt too long. Please keep messages under 2000 characters." });
  }

  if (!provider || !["openai", "gemini", "ollama"].includes(provider)) {
    return json(400, { error: "provider must be one of: openai, gemini, ollama." });
  }

  if (!apiKey) {
    return json(400, { error: "An API key is required." });
  }

  if (!model) {
    return json(400, { error: "A model is required." });
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
    let text = "";
    if (provider === "openai") {
      text = await callOpenAI(apiKey, model, systemInstruction, prompt);
    } else if (provider === "gemini") {
      text = await callGemini(apiKey, model, systemInstruction, prompt);
    } else {
      text = await callOllama(apiKey, model, systemInstruction, prompt, ollamaBaseUrl);
    }
    return json(200, { text });
  } catch (error) {
    console.error("strategist function error:", error);
    return json(502, {
      error: "The Strategist is currently unavailable. Verify your provider, model, and API key, then try again.",
    });
  }
};
