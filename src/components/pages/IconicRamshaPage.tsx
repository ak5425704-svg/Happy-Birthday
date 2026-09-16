import { ICONIC_QUOTES } from '../../data/magazineContent';
import { MessageSquareQuote, Sparkles } from 'lucide-react';

export function IconicRamshaPage() {
  const quotes = ICONIC_QUOTES;

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <MessageSquareQuote className="w-3.5 h-3.5 text-gray-300" />
          <span>DICTIONARY OF CHAOS • FAMOUS CATCHPHRASES</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 09</span>
      </div>

      {/* Main Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 my-2">
        <div className="text-left space-y-1">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
            VERBAL SIGNATURES
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase">
            ICONIC RAMSHA MOMENTS
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
            Things heard on a regular daily basis before disaster or laughter strikes.
          </p>
        </div>
      </div>

      {/* Famous Quotes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-6">
        {quotes.map((q, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all text-left flex flex-col justify-between group relative"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] uppercase tracking-[0.25em] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-sans-modern">
                  {q.tone}
                </span>
              </div>
              <p className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide my-2 silver-text-gradient">
                {q.text}
              </p>
              <p className="text-xs font-sans-modern text-gray-400 font-light leading-relaxed">
                {q.note}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span>RAMSHA VERBATIM #{idx + 1}</span>
              <span>100% ACCURATE</span>
            </div>
          </div>
        ))}

        {/* The Two-Sided Contrast Card: "She said she wouldn't create chaos..." */}
        <div className="sm:col-span-2 p-6 sm:p-8 rounded-2xl border border-white/20 bg-gradient-to-r from-neutral-900/90 via-neutral-950 to-neutral-900/90 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
            <Sparkles className="w-3 h-3 text-gray-300" />
            THE CLASSIC CHRONICLE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-2">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <span className="text-[10px] tracking-widest uppercase text-gray-400 font-sans-modern block mb-1">
                MINUTE 01: THE INNOCENT PROMISE
              </span>
              <p className="font-serif-luxury italic text-xl sm:text-2xl text-gray-300">
                “She said she wouldn't create chaos.”
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/20 bg-white/[0.05]">
              <span className="text-[10px] tracking-widest uppercase text-gray-300 font-sans-modern block mb-1">
                MINUTE 02: THE INEVITABLE REALITY
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white font-black tracking-wider silver-text-gradient">
                “She created chaos.”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>TRANSCRIBED FOR POSTERITY</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
