import { Sparkles, Moon } from 'lucide-react';

export function BlackPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-14 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#060608] via-[#0b0b0e] to-[#040405] shadow-2xl">
      {/* Subtle smoky backdrop light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Moon className="w-3.5 h-3.5 text-gray-300" />
          <span>AESTHETIC STUDY • THE MONOCHROME SOUL</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 05</span>
      </div>

      {/* Centerpiece Monograph */}
      <div className="max-w-3xl mx-auto my-auto text-center space-y-8 relative z-10 py-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-gray-400">
          <Sparkles className="w-3 h-3 text-gray-300" />
          Her Trademark Shade
        </div>

        <div className="space-y-3">
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-[0.14em] text-white uppercase leading-tight">
            BLACK ISN'T <br className="hidden sm:inline" />
            <span className="silver-text-gradient">JUST A COLOUR.</span>
          </h2>
          <p className="font-serif-luxury italic text-xl sm:text-2xl text-gray-300 tracking-wide">
            “It’s a whole personality.”
          </p>
        </div>

        {/* Poetic Essay in Refined Typography */}
        <div className="max-w-2xl mx-auto space-y-5 text-gray-300 font-sans-modern font-light text-sm sm:text-base leading-relaxed text-center sm:text-justify border-y border-white/10 py-8">
          <p>
            Black doesn't scream for attention; it commands presence in quiet elegance. For Ramsha, black is not an absence of light — it is the canvas where her unfiltered humor, midnight mischief, and warm laughter shine with the highest contrast.
          </p>
          <p>
            It represents her mystery, her quiet strength, and her refusal to fit into fragile, pastel molds. It is effortless, timeless, slightly rebellious, and infinitely chic. In a world chasing loud colors, she chooses the depth of midnight and makes it look like pure luxury.
          </p>
        </div>

        {/* 3 Aesthetic Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pt-2">
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 block font-sans-modern mb-1">
              THE MOOD
            </span>
            <span className="font-serif-luxury text-base text-gray-200">
              Moody & Classy
            </span>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 block font-sans-modern mb-1">
              THE RULE
            </span>
            <span className="font-serif-luxury text-base text-gray-200">
              When in doubt, wear black
            </span>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 block font-sans-modern mb-1">
              THE ESSENCE
            </span>
            <span className="font-serif-luxury text-base text-gray-200">
              100% Unapologetic
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern relative z-10">
        <span>THE RAMSHA EDITION • MONOCHROME MONOGRAPH</span>
        <span>BLACK IS FOREVER</span>
      </div>
    </section>
  );
}
