<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5430aa62-476b-489e-bf39-96b7f59173f3

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. For local Netlify Function testing, run `netlify dev`.

## Netlify AI Endpoint (Bring Your Own Key)
- Function path: `netlify/functions/strategist.ts`
- Public endpoint: `POST /api/strategist` (redirected in `netlify.toml`)
- No server-side provider secret is required.
- User must supply:
  - `provider`: `openai`, `gemini`, or `ollama`
  - `apiKey`: user-owned API key for the selected provider
  - `model`: model id for the selected provider
- Optional for Ollama:
  - `ollamaBaseUrl` (default: `https://api.ollama.com/v1`)
    - Native Ollama API: `https://api.ollama.com/api`
    - OpenAI-compatible API: `https://api.ollama.com/v1`

### Request shape
```json
{
  "prompt": "How should I apply Law 3 at work?",
  "bookTitle": "The 48 Laws of Power",
  "bookSummary": "...",
  "bookAnalysis": "...",
  "provider": "openai",
  "apiKey": "sk-...",
  "model": "gpt-4o-mini",
  "ollamaBaseUrl": "https://api.ollama.com/v1"
}
```

### Response shape
```json
{
  "text": "Markdown response from The Strategist"
}
```

Error responses:
```json
{
  "error": "Human-readable message"
}
```

### Local dev flow
1. Run `netlify dev`.
2. Open the app via the Netlify dev URL so `/api/strategist` resolves to the function.
3. In chat, choose provider, enter your own API key, and select a model.

### Deployment behavior
- The browser only calls `/api/strategist`.
- The function uses the user-provided key for that request and does not require a Netlify provider API secret.
