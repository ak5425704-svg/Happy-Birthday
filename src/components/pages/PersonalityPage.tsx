import { PERSONALITY_QUOTES } from '../../data/magazineContent';
import { Quote, Flame, HeartHandshake } from 'lucide-react';

export function PersonalityPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Flame className="w-3.5 h-3.5 text-gray-300" />
          <span>FEATURE SPREAD • PSYCHOLOGICAL DOSSIER</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 03</span>
      </div>

      {/* Main Title Banner */}
      <div className="text-center max-w-2xl mx-auto my-4 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
          THE PHENOMENON
        </span>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-[0.12em] text-white">
          THE GIRL BEHIND THE CHAOS
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
          A delicate balance between innocent angel eyes and an unstoppable craving for mischief.
        </p>
      </div>

      {/* Magazine Quote Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-6">
        {PERSONALITY_QUOTES.map((card, idx) => (
          <div
            key={card.id}
            className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group ${
              idx === 4
                ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-white/20'
                : 'glass-panel border-white/10 hover:border-white/25 hover:bg-white/[0.07]'
            }`}
          >
            {/* Top Tag & Quote Icon */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-sans-modern px-2 py-0.5 rounded bg-white/5 border border-white/10">
                {card.tag}
              </span>
              <Quote className="w-5 h-5 text-gray-600 group-hover:text-gray-300 transition-colors" />
            </div>

            {/* Main Quote */}
            <div className="my-2 space-y-2">
              <p className="font-serif-luxury text-xl sm:text-2xl text-white font-medium tracking-tight leading-snug group-hover:silver-text-gradient transition-all">
                “{card.quote}”
              </p>
              {card.context && (
                <p className="text-xs font-sans-modern text-gray-400 leading-relaxed pt-1">
                  {card.context}
                </p>
              )}
            </div>

            {/* Bottom Citation */}
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-sans-modern">
              <span>Ramsha Observation #{idx + 1}</span>
              {idx === 4 && (
                <span className="flex items-center gap-1 text-gray-300">
                  <HeartHandshake className="w-3 h-3" /> Core Memory
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Pullquote footnote */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>A STUDY IN UNPREDICTABLE CHARM</span>
        <span>THE RAMSHA EDITION • VOLUME XVIII</span>
      </div>
    </section>
  );
}
