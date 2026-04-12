import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, X } from 'lucide-react';
import { askStrategist } from '../lib/gemini';
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

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ bookTitle, bookSummary, bookAnalysis, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await askStrategist(userMessage, bookTitle, bookSummary, bookAnalysis);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 w-full max-w-md h-[600px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <Bot size={18} className="text-black" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">The Strategist</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Robert Greene AI Expert</p>
          </div>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-zinc-500 text-sm italic">"The mind must not settle into any one way of thinking."</p>
            <p className="text-zinc-600 text-xs mt-2">— Ask me anything about Greene's strategies. If server AI is not configured, chat will stay in coming-soon mode.</p>
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

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
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
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-orange-500 hover:text-orange-400 disabled:text-zinc-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
