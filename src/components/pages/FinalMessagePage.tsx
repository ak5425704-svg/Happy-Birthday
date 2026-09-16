import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function FinalMessagePage() {
  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#c5c5d0', '#50505c', '#15151a'],
    });
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-14 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Heart className="w-3.5 h-3.5 text-gray-300" />
          <span>VALEDICTION • THE FINAL COUNSEL</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 19</span>
      </div>

      {/* Main Emotional Message Card */}
      <div className="max-w-3xl mx-auto my-auto text-left sm:text-center space-y-6 relative z-10 py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-gray-400 mx-auto">
          <Sparkles className="w-3 h-3 text-gray-300" />
          Closing Monologue
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase leading-tight">
          AND BEFORE THIS <br />
          <span className="silver-text-gradient font-serif-luxury italic font-normal">
            Chapter Ends…
          </span>
        </h2>

        {/* The Heartfelt Words */}
        <div className="space-y-5 font-sans-modern text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mx-auto border-y border-white/10 py-8 text-justify sm:text-center">
          <p className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium italic">
            “Happy 18th Birthday, Ramsha.”
          </p>
          <p className="font-serif-luxury text-xl sm:text-2xl silver-text-gradient font-semibold">
            Stay happy. Stay crazy. Stay exactly who you are.
          </p>
          <p className="text-gray-300 text-sm sm:text-base">
            Life is going to bring you many new places, people, memories and chapters. I hope every new chapter gives you more reasons to smile.
          </p>
          <p className="text-gray-300 text-sm sm:text-base">
            And wherever life takes you, never forget the people who were there for the little moments too.
          </p>
          <p className="font-serif-luxury text-xl sm:text-2xl text-white font-medium pt-2">
            Here’s to 18 — and to everything that comes next. 🖤
          </p>
        </div>

        {/* Celebration Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={triggerCelebration}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-sans-modern uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Send Birthday Blessings 🖤</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern relative z-10">
        <span>TO RAMSHA • WITH LOVE AND RESPECT</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
