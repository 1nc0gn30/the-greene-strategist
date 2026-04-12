import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  Shield,
  Search,
  ScrollText,
  Globe,
  Quote,
} from 'lucide-react';
import { BOOKS, Book } from './constants/books';
import {
  CORE_PHILOSOPHY,
  GREENE_METHOD,
  NOTABLE_QUOTES,
  PROFILE_POINTS,
  RESOURCE_LINKS,
} from './constants/robertGreene';
import { ChatInterface } from './components/ChatInterface';
import { cn } from './lib/utils';

function getBookSearchUrl(title: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(`Robert Greene ${title}`)}`;
}

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(
    () =>
      BOOKS.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-orange-500/30">
      <div className="fixed inset-0 -z-10 opacity-35 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(251,146,60,0.24),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_25%,rgba(2,132,199,0.14),transparent_40%)]" />
      </div>

      <nav className="fixed top-0 w-full z-40 bg-black/70 backdrop-blur-xl border-b border-zinc-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <button
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setSelectedBook(null);
              scrollToSection('top');
            }}
          >
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Shield className="text-black" size={24} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tighter uppercase leading-none text-white">The Greene</h1>
              <p className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase leading-none mt-1">Strategist</p>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <button className="hover:text-orange-500 transition-colors" onClick={() => scrollToSection('bibliography')}>
              Bibliography
            </button>
            <button className="hover:text-orange-500 transition-colors" onClick={() => scrollToSection('philosophy')}>
              Method
            </button>
            <button className="hover:text-orange-500 transition-colors" onClick={() => scrollToSection('resources')}>
              Resources
            </button>
          </div>

          <div className="flex items-center gap-4">
            <label className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900/60 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-orange-500/50 w-48 transition-all focus:w-64"
                aria-label="Search Robert Greene books"
              />
            </label>
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors relative group"
              aria-label="Open strategist chat"
            >
              <MessageSquare size={18} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-black animate-pulse" />
            </button>
          </div>
        </div>
      </nav>

      <main id="top" className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedBook ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-14"
            >
              <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">Strategic Philosophy & Bibliography</p>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
                    Master the <span className="text-orange-500">Mechanics</span> of Power.
                  </h2>
                  <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">
                    A complete strategic profile of Robert Greene: biography, methodology, bibliography, and high-signal resources in one
                    place.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-zinc-800/80 overflow-hidden relative">
                    <img
                      src="/images/chess-strategy.jpg"
                      alt="Chess board representing strategic planning"
                      className="w-full h-[300px] object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 p-6 space-y-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Core Thesis</p>
                      <p className="text-zinc-100 text-sm leading-relaxed">Power is not moral or immoral. It is structural. Learn its patterns or be ruled by them.</p>
                    </div>
                  </div>
                </div>
              </header>

              <section id="philosophy" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <article className="lg:col-span-7 p-8 md:p-10 rounded-3xl border border-zinc-800 bg-zinc-950/75">
                  <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-orange-400">I. Biographical Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PROFILE_POINTS.map((point) => (
                        <div key={point.label} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/45">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">{point.label}</p>
                          <p className="text-sm text-zinc-200 mt-2 leading-relaxed">{point.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <p className="text-zinc-300 leading-relaxed"><span className="text-zinc-100 font-semibold">Core Philosophy:</span> {CORE_PHILOSOPHY}</p>
                      <p className="text-zinc-300 leading-relaxed"><span className="text-zinc-100 font-semibold">The Greene Method:</span> {GREENE_METHOD}</p>
                    </div>
                  </div>
                </article>

                <aside className="lg:col-span-5 rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-950/60">
                  <img
                    src="/images/robert-greene.jpg"
                    alt="Portrait of Robert Greene"
                    className="w-full aspect-[4/5] object-cover object-center"
                  />
                  <div className="p-6 border-t border-zinc-800">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Strategic Observer</p>
                    <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
                      Greene&apos;s body of work trains pattern recognition: emotion control, reputation management, and adaptive strategy across volatile systems.
                    </p>
                  </div>
                </aside>
              </section>

              <section id="bibliography" className="space-y-6">
                <div className="flex items-center gap-3">
                  <ScrollText size={16} className="text-orange-400" />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-orange-400">II. Comprehensive Bibliography</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBooks.map((book, i) => (
                    <motion.button
                      key={book.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setSelectedBook(book)}
                      className="group text-left"
                    >
                      <div
                        className={cn(
                          'aspect-[3/4] rounded-2xl p-7 flex flex-col justify-between transition-all duration-400 relative overflow-hidden border border-white/10',
                          book.coverColor,
                          'group-hover:scale-[1.015] group-hover:shadow-[0_24px_70px_rgba(0,0,0,0.45)]',
                        )}
                      >
                        <img
                          src={book.coverImage}
                          alt={`${book.title} cover`}
                          className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-55 transition-opacity duration-400"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/6 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                        <div className="space-y-3 relative z-10 text-white">
                          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">{book.year}</span>
                          <h4 className="text-3xl font-black tracking-tighter leading-tight">{book.title}</h4>
                        </div>

                        <div className="space-y-6 relative z-10 text-white">
                          <p className="text-sm text-white/75 line-clamp-4 leading-relaxed">{book.description}</p>
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                            Open dossier <ChevronRight size={14} />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>

              <section id="resources" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <article className="lg:col-span-7 p-8 rounded-3xl border border-zinc-800 bg-zinc-950/65">
                  <div className="flex items-center gap-3 mb-5">
                    <Globe size={16} className="text-orange-400" />
                    <h3 className="text-xs uppercase tracking-[0.3em] text-orange-400">III. Valid Digital Resources</h3>
                  </div>
                  <div className="space-y-4">
                    {RESOURCE_LINKS.map((resource) => (
                      <a
                        key={resource.url}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-orange-500/40 transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-zinc-100">{resource.name}</p>
                          <p className="text-xs text-zinc-400 leading-relaxed">{resource.description}</p>
                        </div>
                        <ExternalLink size={15} className="text-zinc-500 shrink-0 mt-1" />
                      </a>
                    ))}
                  </div>
                </article>

                <aside className="lg:col-span-5 rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-950/65">
                  <img
                    src="/images/ancient-bust.jpg"
                    alt="Classical bust representing historical and philosophical synthesis"
                    className="w-full h-60 object-cover opacity-70"
                  />
                  <div className="p-6 space-y-5">
                    <div className="flex items-center gap-3">
                      <Quote size={16} className="text-orange-400" />
                      <h3 className="text-xs uppercase tracking-[0.3em] text-orange-400">IV. Notable Quotes</h3>
                    </div>
                    <div className="space-y-3">
                      {NOTABLE_QUOTES.map((quote) => (
                        <blockquote key={quote} className="border-l-2 border-orange-500/50 pl-4 text-sm text-zinc-300 leading-relaxed">
                          {quote}
                        </blockquote>
                      ))}
                    </div>
                  </div>
                </aside>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <button
                onClick={() => setSelectedBook(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <ArrowLeft size={16} /> Back to Library
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 space-y-8">
                  <div
                    className={cn(
                      'aspect-[3/4] rounded-3xl p-12 flex flex-col justify-end shadow-2xl relative overflow-hidden border border-white/10',
                      selectedBook.coverColor,
                    )}
                  >
                    <img
                      src={selectedBook.coverImage}
                      alt={`${selectedBook.title} cover`}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                    <div className="absolute top-12 right-12 opacity-10 text-white">
                      <Shield size={120} />
                    </div>
                    <div className="space-y-4 text-white">
                      <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/40">{selectedBook.year}</span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none">{selectedBook.title}</h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {selectedBook.keyThemes.map((theme) => (
                      <span
                        key={theme}
                        className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-12">
                  <section className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">The Essence</h3>
                    <p className="text-2xl text-zinc-300 leading-relaxed font-medium italic">&quot;{selectedBook.summary}&quot;</p>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">Deep Analysis</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-zinc-400 leading-relaxed text-lg">{selectedBook.detailedAnalysis}</p>
                    </div>
                  </section>

                  {selectedBook.chapters && (
                    <section className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">Structure & Chapters</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedBook.chapters.map((chapter, i) => (
                          <div key={i} className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
                            <h4 className="text-zinc-100 font-bold mb-2">{chapter.title}</h4>
                            <p className="text-sm text-zinc-500 leading-relaxed">{chapter.content}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {selectedBook.laws && (
                    <section className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">Laws & Archetypes</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedBook.laws.map((law, i) => (
                          <div
                            key={i}
                            className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
                          >
                            <p className="text-xs text-zinc-100 font-medium group-hover:text-orange-500 transition-colors">{law}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {selectedBook.strategies && (
                    <section className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">Strategic Frameworks</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedBook.strategies.map((strategy, i) => (
                          <div
                            key={i}
                            className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group"
                          >
                            <p className="text-xs text-zinc-100 font-medium group-hover:text-orange-500 transition-colors">{strategy}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row gap-6">
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="flex-1 bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-widest py-5 rounded-2xl transition-all flex items-center justify-center gap-3"
                    >
                      <MessageSquare size={20} /> Ask The Strategist
                    </button>
                    <a
                      href={getBookSearchUrl(selectedBook.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all border border-zinc-800 flex items-center justify-center gap-3"
                    >
                      <ExternalLink size={20} /> Get the Book
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <Shield size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">The Greene Strategist © 2026</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            <a href="https://powerseductionandwar.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
              Official Site
            </a>
            <a
              href="https://dailyrobertgreene.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              Substack
            </a>
            <a
              href="https://www.goodreads.com/author/show/865.Robert_Greene"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              Goodreads
            </a>
          </div>
        </div>
      </footer>

      <ChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        bookTitle={selectedBook ? selectedBook.title : 'General Robert Greene works'}
        bookSummary={selectedBook ? selectedBook.summary : ''}
        bookAnalysis={selectedBook ? selectedBook.detailedAnalysis : ''}
      />
    </div>
  );
}
