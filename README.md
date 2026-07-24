<!-- xonettn -->
<div align="center">

# ⚛️ The Greene Strategist

A strategic profile of Robert Greene: biography, core philosophy, Greene method, complete bibliography, and trusted resources for deeper study.


![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)

![Deploy](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify&logoColor=white)

</div>

---

## 📋 Overview
A strategic profile of Robert Greene: biography, core philosophy, Greene method, complete bibliography, and trusted resources for deeper study.

## 📦 Tech Stack
- React
- Vite
- Netlify (deployed)

## 🗂️ Project Structure
```
the-greene-strategist/
  - netlify
  - public
  - src
  (40 files total)
```

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js (v18+)
- npm or yarn

### 📦 Installation
```bash
git clone https://github.com/1nc0gn30/the-greene-strategist.git
cd the-greene-strategist
npm install
```

### 💻 Development
```bash
npm run dev
```

### 🔨 Build
```bash
npm run build
```

### ⚙️ Available Scripts
  npm run dev - vite --port=3000 --host=0.0.0.0
  npm run build - vite build
  npm run preview - vite preview
  npm run clean - rm -rf dist
  npm run lint - tsc --noEmit

## 📂 Original README
<details>
<summary>Click to expand original README</summary>

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5430aa62-476b-489e-bf39-96b7f59173f3

## 🚀 Run Locally

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

### 💻 Local dev flow
1. Run `netlify dev`.
2. Open the app via the Netlify dev URL so `/api/strategist` resolves to the function.
3. In chat, choose provider, enter your own API key, and select a model.

### 🚀 Deployment behavior
- The browser only calls `/api/strategist`.
- The function uses the user-provided key for that request and does not require a Netlify provider API secret.

</details>

## 📝 TODO / Roadmap
- [ ] Add unit tests
- [ ] Add LICENSE file
- [ ] Add Dockerfile for containerized deployment
- [ ] Consider adding Tailwind CSS
- [ ] Add CI/CD pipeline
- [ ] Add contribution guidelines (CONTRIBUTING.md)
- [ ] Improve error handling and edge cases
- [ ] Add environment variable documentation
- [ ] Update dependencies to latest versions
- [ ] Add code comments and inline documentation

## 🚀 Deployment
This project is deployed on Netlify. See netlify.toml for configuration.

## 👤 Author
**Neal Frazier** - [@AshAmplifies](https://github.com/1nc0gn30)

## 🔗 Links
- GitHub: https://github.com/1nc0gn30/the-greene-strategist

---
*This README was enhanced as part of the neals-projects-2026 batch update.*

---

<div align="center">

**[xonettn]** · Built by [Neal Frazier](https://github.com/1nc0gn30) · [@AshAmplifies](https://twitter.com/AshAmplifies)

</div>
