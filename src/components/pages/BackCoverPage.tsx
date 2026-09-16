import { RotateCcw, ArrowUp } from 'lucide-react';

interface BackCoverPageProps {
  onReplay: () => void;
}

export function BackCoverPage({ onReplay }: BackCoverPageProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="epilogue"
      className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-14 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#050507] via-[#09090c] to-[#040405] shadow-2xl scroll-mt-24"
    >
      {/* Top Bar */}
      <div className="w-full border-b border-white/10 pb-4 flex justify-between items-center text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400 font-sans-modern">
        <span>THE RAMSHA EDITION</span>
        <span>FINAL IMPRIMATUR</span>
        <span>CHAPTER XVIII</span>
      </div>

      {/* Centerpiece Minimal Monolith */}
      <div className="max-w-xl mx-auto my-auto text-center space-y-8 relative z-10 py-8">
        {/* Subtle glowing "18" */}
        <div className="relative inline-block my-2">
          <span className="font-serif-luxury text-8xl sm:text-9xl md:text-[150px] font-black leading-none silver-text-gradient tracking-tighter block select-none">
            18
          </span>
          <div className="absolute inset-0 flex items-center justify-center -z-10 blur-3xl opacity-25 bg-white rounded-full" />
        </div>

        <div className="space-y-3">
          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black tracking-[0.16em] text-white uppercase leading-tight">
            RAMSHA — CHAPTER 18
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto my-4" />
          <p className="font-cormorant italic text-lg sm:text-2xl text-gray-300 font-light leading-relaxed">
            “End of this edition. <br />
            Beginning of another chapter.”
          </p>
        </div>

        {/* Action Buttons: Replay Intro & Back to Top */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToTop}
            className="group px-7 py-3 rounded-full bg-white text-black hover:bg-gray-200 font-sans-modern text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold flex items-center gap-2.5 transition-all shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Back to Top</span>
          </button>

          <button
            id="replay-story-button"
            onClick={onReplay}
            className="group px-7 py-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-white font-sans-modern text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center gap-2.5 transition-all shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-500" />
            <span>Replay Intro</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar: Barcode, Copyright & Finale */}
      <div className="w-full border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-400 text-[10px] uppercase tracking-widest font-sans-modern">
        <span>A PRIVATE EDITION COMMEMORATING HER 18TH BIRTHDAY</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-tighter text-gray-400">|||| | || |||| | |||</span>
          <span>RAMSHA-XVIII-FINALE</span>
        </div>
      </div>
    </section>
  );
}
