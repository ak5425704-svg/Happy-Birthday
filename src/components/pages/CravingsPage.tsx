import { FOOD_CRAVINGS } from '../../data/magazineContent';
import { Utensils, AlertCircle } from 'lucide-react';

export function CravingsPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Utensils className="w-3.5 h-3.5 text-gray-300" />
          <span>GASTRONOMY & MENTAL FACULTIES • SPECIAL CRITIQUE</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 04</span>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-2xl mx-auto my-3 space-y-1">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
          THE ESSENTIAL MENU
        </span>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-[0.12em] text-white">
          SIMPLY HER CRAVINGS
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
          The three irreplaceable culinary pillars that power Ramsha’s daily existence.
        </p>
      </div>

      {/* 3 Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {FOOD_CRAVINGS.map((item) => {
          const isDimag = item.id === 'dimag';
          return (
            <div
              key={item.id}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group ${
                isDimag
                  ? 'border-white/20 bg-gradient-to-b from-white/[0.08] to-black/80 hover:border-white/30'
                  : item.highlight
                  ? 'border-white/25 bg-gradient-to-b from-white/[0.06] to-black/70 hover:border-white/35 shadow-xl'
                  : 'glass-panel border-white/10 hover:border-white/25'
              }`}
            >
              {/* Top Accent Icon & Badging */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl sm:text-5xl select-none filter drop-shadow-md">
                  {item.icon}
                </span>
                {isDimag ? (
                  <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-amber-200/90 font-sans-modern px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    <AlertCircle className="w-3 h-3" /> Urgent
                  </span>
                ) : (
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-sans-modern px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    Essential
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2 mb-4">
                <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide group-hover:silver-text-gradient transition-all">
                  {item.title}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans-modern font-medium">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm font-sans-modern text-gray-300 leading-relaxed font-light pt-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom Humor Note */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-400 font-sans-modern">
                <span className="italic font-cormorant text-sm text-gray-300">
                  {item.humorNote}
                </span>
                <span className="uppercase tracking-widest font-mono text-[9px] text-gray-400">
                  ★ ★ ★ ★ ★
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Editorial Comment */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>VERDICT: 10/10 FOR BIRYANI & PIZZA • DIMAG: TO BE ACQUIRED IN CHAPTER 18</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
