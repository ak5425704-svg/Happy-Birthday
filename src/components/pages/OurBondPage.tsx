import { ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export function OurBondPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-14 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.025] rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <HeartHandshake className="w-3.5 h-3.5 text-gray-300" />
          <span>ESSAY ON KINSHIP • THE CHOSEN FAMILY</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 10</span>
      </div>

      {/* Centerpiece Essay */}
      <div className="max-w-3xl mx-auto my-auto text-left sm:text-center space-y-6 relative z-10 py-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-gray-400 mx-auto">
          <Sparkles className="w-3 h-3 text-gray-300" />
          The Bond
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-white uppercase leading-tight">
          BEYOND FRIENDSHIP. <br />
          <span className="silver-text-gradient font-serif-luxury italic font-normal">
            A Sisterhood Formed in Fire & Laughter.
          </span>
        </h2>

        {/* The Heartfelt Sister-Like Reflection */}
        <div className="space-y-4 font-sans-modern text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto text-justify sm:text-center border-y border-white/10 py-6">
          <p className="text-base sm:text-lg font-serif-luxury text-gray-200 italic">
            “Some friendships don't remain just friendships. Somewhere between conversations, arguments, jokes, kand and countless memories, they start feeling like family.”
          </p>
          <p>
            You can’t choose the family you are born into, but you can choose the souls who walk beside you through the noise of life. Having Ramsha around means having someone who will argue over the smallest piece of pizza, create unprovoked chaos at midnight, yet stand fiercely loyal without blinking.
          </p>
          <p>
            It is a bond defined by mutual teasing, unconditional protection, and the kind of sisterly honesty where you never have to pretend to be someone you are not.
          </p>
        </div>

        {/* Featured Pullquote Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md max-w-xl mx-auto text-center space-y-2 shadow-xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-sans-modern block">
            THE ETERNAL TRUTH
          </span>
          <p className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide silver-text-gradient">
            “A friend by chance, a sister by heart.”
          </p>
          <p className="font-handwriting text-xl text-gray-400 pt-1">
            Always in your corner, through every chapter and every kand.
          </p>
        </div>

        {/* Key Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left sm:text-center pt-2">
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
            <span className="text-[9px] uppercase tracking-widest text-gray-400 block font-sans-modern">
              PROTECTION
            </span>
            <span className="text-xs text-gray-300 font-serif-luxury">Always got your back</span>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
            <span className="text-[9px] uppercase tracking-widest text-gray-400 block font-sans-modern">
              LOYALTY
            </span>
            <span className="text-xs text-gray-300 font-serif-luxury">Zero doubts, 100% real</span>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
            <span className="text-[9px] uppercase tracking-widest text-gray-400 block font-sans-modern">
              KAND PARTNER
            </span>
            <span className="text-xs text-gray-300 font-serif-luxury">Co-conspirator for life</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern relative z-10">
        <span>OUR BOND • FOREVER UNBREAKABLE</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
