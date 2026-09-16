import { HYPOTHETICALS } from '../../data/magazineContent';
import { HelpCircle, Sparkles, Flame, Compass, CloudRain, Music, Film } from 'lucide-react';

export function IfRamshaWerePage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-gray-300" />;
      case 'Flame': return <Flame className="w-4 h-4 text-gray-300" />;
      case 'Compass': return <Compass className="w-4 h-4 text-gray-300" />;
      case 'CloudRain': return <CloudRain className="w-4 h-4 text-gray-300" />;
      case 'Music': return <Music className="w-4 h-4 text-gray-300" />;
      case 'Film': return <Film className="w-4 h-4 text-gray-300" />;
      default: return <Sparkles className="w-4 h-4 text-gray-300" />;
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
          <span>METAPHYSICAL CORRESPONDENCES • THE ESSENCE MATRIX</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 12</span>
      </div>

      {/* Main Title Banner */}
      <div className="text-center max-w-3xl mx-auto my-3 space-y-1">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
          THE HYPOTHETICAL PARALLELS
        </span>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wide text-white uppercase">
          IF RAMSHA WERE...
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
          Deciphering her chaotic soul through colors, melodies, destinations, and moods.
        </p>
      </div>

      {/* Hypothetical Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
        {HYPOTHETICALS.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-sans-modern">
                  PROPOSITION #{idx + 1}
                </span>
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                  {getIcon(item.iconName)}
                </div>
              </div>

              <span className="text-xs uppercase tracking-wider text-gray-400 font-sans-modern block mb-1">
                {item.prompt}
              </span>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:silver-text-gradient transition-all my-2">
                → {item.answer}
              </h3>

              {item.comment && (
                <p className="text-xs font-sans-modern text-gray-400 font-light leading-relaxed pt-1">
                  {item.comment}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>ACCURACY RATING</span>
              <span>100%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>THE RAMSHA EDITION • SPECULATIVE ARCHIVES</span>
        <span>NO OTHER PERSON COMPARES</span>
      </div>
    </section>
  );
}
