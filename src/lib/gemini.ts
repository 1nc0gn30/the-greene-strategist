export async function askStrategist(prompt: string, bookTitle: string, bookSummary: string, bookAnalysis: string) {
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
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!response.ok) {
    return payload.error || 'The Strategist is unavailable for this deployment.';
  }

  return payload.text || 'The Strategist is currently contemplating. Please try again in a moment.';
}
