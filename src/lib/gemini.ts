export type AIProvider = 'openai' | 'gemini' | 'ollama';

export interface StrategistProviderConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  ollamaBaseUrl?: string;
}

export async function askStrategist(
  prompt: string,
  bookTitle: string,
  bookSummary: string,
  bookAnalysis: string,
  config: StrategistProviderConfig,
) {
  const response = await fetch('/api/strategist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      bookTitle,
      bookSummary,
      bookAnalysis,
      provider: config.provider,
      apiKey: config.apiKey,
      model: config.model,
      ollamaBaseUrl: config.ollamaBaseUrl,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!response.ok) {
    return payload.error || 'The Strategist is unavailable for this deployment.';
  }

  return payload.text || 'The Strategist is currently contemplating. Please try again in a moment.';
}
