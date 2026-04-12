import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Loader2, X } from 'lucide-react';
import { askStrategist, type AIProvider } from '../lib/gemini';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  bookTitle: string;
  bookSummary: string;
  bookAnalysis: string;
  isOpen: boolean;
  onClose: () => void;
}

const PROVIDER_DEFAULT_MODELS: Record<AIProvider, string> = {
  openai: 'gpt-4o-mini',
  gemini: 'gemini-1.5-flash',
  ollama: 'gemma4',
};

const PROVIDER_MODEL_OPTIONS: Record<AIProvider, string[]> = {
  openai: ['gpt-4o-mini', 'gpt-4.1-mini', 'gpt-4.1'],
  gemini: ['gemini-1.5-flash', 'gemini-1.5-pro'],
  ollama: ['gemma4', 'llama3.1', 'qwen2.5'],
};

const API_KEY_HINTS: Record<AIProvider, string> = {
  openai: 'OpenAI key usually starts with sk-',
  gemini: 'Gemini key usually starts with AIza',
  ollama: 'Use your Ollama API key',
};

function isApiKeyValidForProvider(provider: AIProvider, apiKey: string): boolean {
  const trimmed = apiKey.trim();
  if (!trimmed) return false;
  if (provider === 'openai') return /^sk-[a-zA-Z0-9_-]{20,}$/.test(trimmed);
  if (provider === 'gemini') return /^AIza[a-zA-Z0-9_-]{20,}$/.test(trimmed);
  return trimmed.length >= 10;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ bookTitle, bookSummary, bookAnalysis, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<AIProvider>('openai');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState(PROVIDER_DEFAULT_MODELS.openai);
  const [ollamaBaseUrl, setOllamaBaseUrl] = useState('https://api.ollama.com/v1');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isApiKeyValid = isApiKeyValidForProvider(provider, apiKey);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!isApiKeyValid) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Enter a valid ${provider} API key before sending.` }]);
      return;
    }
    if (!model.trim()) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Enter a model name for your selected provider.' }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    try {
      const response = await askStrategist(userMessage, bookTitle, bookSummary, bookAnalysis, {
        provider,
        apiKey: apiKey.trim(),
        model: model.trim(),
        ollamaBaseUrl: provider === 'ollama' ? ollamaBaseUrl.trim() : undefined,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Network error while contacting The Strategist. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] pointer-events-auto md:hidden" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="pointer-events-auto absolute inset-x-3 bottom-3 top-24 md:top-auto md:inset-x-auto md:right-6 md:bottom-6 md:w-full md:max-w-md h-auto md:h-[600px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
              <Bot size={18} className="text-black" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-zinc-100">The Strategist</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest truncate">Robert Greene AI Expert</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors shrink-0" aria-label="Close strategist chat">
            <X size={20} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 min-h-0">
          {messages.length === 0 && (
            <div className="text-center py-10">
              <p className="text-zinc-500 text-sm italic">"The mind must not settle into any one way of thinking."</p>
              <p className="text-zinc-600 text-xs mt-2">— Ask me anything about Greene&apos;s strategies. Connect your own Gemini, OpenAI, or Ollama API key below.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-zinc-700" : "bg-orange-900/30 border border-orange-500/20"
              )}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-orange-500" />}
              </div>
              <div className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user' ? "bg-zinc-800 text-zinc-100" : "bg-zinc-900 border border-zinc-800 text-zinc-300"
              )}>
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-900/30 border border-orange-500/20 flex items-center justify-center">
                <Loader2 size={14} className="text-orange-500 animate-spin" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <label className="text-[11px] uppercase tracking-wider text-zinc-500">
              Provider
              <select
                value={provider}
                onChange={(e) => {
                  const nextProvider = e.target.value as AIProvider;
                  setProvider(nextProvider);
                  setModel(PROVIDER_DEFAULT_MODELS[nextProvider]);
                }}
                className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="openai">OpenAI</option>
                <option value="gemini">Gemini</option>
                <option value="ollama">Ollama</option>
              </select>
            </label>
            <label className="text-[11px] uppercase tracking-wider text-zinc-500">
              Model
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model name"
                list={`models-${provider}`}
                className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <datalist id={`models-${provider}`}>
                {PROVIDER_MODEL_OPTIONS[provider].map((modelOption) => (
                  <option key={modelOption} value={modelOption} />
                ))}
              </datalist>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-2 mb-3">
            <label className="text-[11px] uppercase tracking-wider text-zinc-500">
              API Key Type
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={API_KEY_HINTS[provider]}
                className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
            </label>
            {!isApiKeyValid && apiKey.trim() && (
              <p className="text-[11px] text-amber-400">{API_KEY_HINTS[provider]}</p>
            )}
            <p className="text-[11px] text-zinc-500">Bring your own key is required. Keys are only used to process your request.</p>
            {provider === 'ollama' && (
              <label className="text-[11px] uppercase tracking-wider text-zinc-500">
                Ollama Base URL
                <input
                  type="text"
                  value={ollamaBaseUrl}
                  onChange={(e) => setOllamaBaseUrl(e.target.value)}
                  placeholder="https://api.ollama.com/v1"
                  className="mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </label>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || !isApiKeyValid || !model.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-orange-500 hover:text-orange-400 disabled:text-zinc-600 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
