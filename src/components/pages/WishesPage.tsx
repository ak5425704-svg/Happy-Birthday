import { useState } from 'react';
import { EIGHTEEN_WISHES } from '../../data/magazineContent';
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function WishesPage() {
  const [revealedYears, setRevealedYears] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
  ]);

  const handleYearClick = (year: number) => {
    if (year === 18) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#a0a0ab', '#404048'],
      });
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Heart className="w-3.5 h-3.5 text-gray-300" />
          <span>LIFETIME BENEDICTIONS • 18 BLESSINGS</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 16</span>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-3xl mx-auto my-2 space-y-1">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
          A PRAYER FOR EVERY MILESTONE
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase">
          18 WISHES FOR CHAPTER 18
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
          Eighteen wishes, crafted with deep affection for each year of your incredible journey.
        </p>
      </div>

      {/* 18 Wishes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-6 max-h-[55vh] overflow-y-auto pr-1">
        {EIGHTEEN_WISHES.map((item) => (
          <div
            key={item.year}
            onClick={() => handleYearClick(item.year)}
            className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between group cursor-pointer ${
              item.year === 18
                ? 'border-white/30 bg-gradient-to-br from-white/15 via-white/5 to-black/80 shadow-xl'
                : 'glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-white transition-colors">
                YEAR {String(item.year).padStart(2, '0')}
              </span>
              {item.year === 18 ? (
                <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-white px-2 py-0.5 rounded bg-white/20 font-sans-modern">
                  <Sparkles className="w-2.5 h-2.5" /> TODAY
                </span>
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" />
              )}
            </div>

            <p className="font-serif-luxury text-sm sm:text-base text-gray-200 font-normal leading-relaxed group-hover:text-white transition-colors">
              “{item.wish}”
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>MAY EVERY SINGLE ONE COME TRUE</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
