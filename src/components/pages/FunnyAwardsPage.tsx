import { AWARDS } from '../../data/magazineContent';
import { Trophy, Award, Sparkles } from 'lucide-react';

export function FunnyAwardsPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Trophy className="w-3.5 h-3.5 text-gray-300" />
          <span>ANNUAL GALA • THE RAMSHA HONOURS 2026</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 11</span>
      </div>

      {/* Main Title Banner */}
      <div className="text-center max-w-3xl mx-auto my-3 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-gray-400">
          <Sparkles className="w-3 h-3 text-gray-300" />
          Official Laurels
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wide text-white uppercase">
          THE KAND & CHAOS AWARDS
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
          Presented unconditionally by unanimous jury vote to Ramsha for outstanding contributions to daily entertainment.
        </p>
      </div>

      {/* The 8 Award Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-6">
        {AWARDS.map((award, idx) => (
          <div
            key={award.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 text-left flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Corner Badge */}
            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-sans-modern">
                {award.category}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:scale-110 group-hover:bg-white/10 transition-transform">
                <Award className="w-4 h-4 text-gray-300 group-hover:text-white" />
              </div>
            </div>

            {/* Title & Citation */}
            <div className="my-1 space-y-1.5">
              <span className="font-mono text-[9px] text-gray-400 block tracking-tighter">
                HONOUR #{String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif-luxury text-lg font-bold text-white leading-snug group-hover:silver-text-gradient transition-all">
                {award.title}
              </h3>
              <p className="text-xs font-sans-modern text-gray-400 font-light leading-relaxed pt-1">
                {award.citation}
              </p>
            </div>

            {/* Bottom Citation Stamp */}
            <div className="mt-4 pt-2.5 border-t border-white/5 flex justify-between items-center text-[9px] text-gray-400 uppercase tracking-widest font-mono">
              <span>UNCONTESTED</span>
              <span>100% DESERVED</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>THE RAMSHA EDITION • TROPHY ARCHIVES</span>
        <span>NO REFUNDS, NO RECOUNTS</span>
      </div>
    </section>
  );
}
