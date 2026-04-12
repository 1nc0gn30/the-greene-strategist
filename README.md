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
3. For local Netlify Function testing, run `netlify dev` and set `OLLAMA_API_KEY` in your shell.

## Netlify AI Endpoint (Server-side Secret)
- Function path: `netlify/functions/strategist.ts`
- Public endpoint: `POST /api/strategist` (redirected in `netlify.toml`)
- Required env var: `OLLAMA_API_KEY`
- Optional env vars:
  - `OLLAMA_BASE_URL` (default: `https://ollama.com/api`)
    - Native Ollama API: `https://ollama.com/api`
    - OpenAI-compatible API: `https://ollama.com/v1`
  - `OLLAMA_MODEL` (default: `gpt-oss:120b`)

### Request shape
```json
{
  "prompt": "How should I apply Law 3 at work?",
  "bookTitle": "The 48 Laws of Power",
  "bookSummary": "...",
  "bookAnalysis": "..."
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
1. Set env vars in shell or `.env` used by Netlify CLI.
2. Run `netlify dev`.
3. Open the app via the Netlify dev URL so `/api/strategist` resolves to the function.

### Deployment behavior
- The browser only calls `/api/strategist`; your Ollama API key stays server-side in Netlify env.
- If `OLLAMA_API_KEY` is missing, the function returns a safe coming-soon style error.
