import { MAGAZINE_FACTS } from '../../data/magazineContent';
import { UserCheck, Sparkles, Star } from 'lucide-react';

export function AboutPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Editorial Category Eyebrow */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-8">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <UserCheck className="w-3.5 h-3.5 text-gray-300" />
          <span>PROFILE DOSSIER • ISSUE 18</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 02</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start my-auto">
        {/* Left Column: Heartfelt Essay (Not romantic, true sister/family bond) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400">
            <Sparkles className="w-3 h-3 text-gray-300" />
            The Dossier
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide leading-tight">
            NOT JUST A FRIEND. <br />
            <span className="silver-text-gradient font-serif-luxury italic font-normal">
              Family by Heart.
            </span>
          </h2>

          <div className="space-y-4 font-sans-modern text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            <p className="first-letter:text-4xl first-letter:font-serif-luxury first-letter:font-bold first-letter:text-white first-letter:mr-2 first-letter:float-left">
              Some people enter our lives casually through everyday coincidences, yet over time, conversations turn into shared secrets, arguments turn into unforgettable laughter, and shared moments turn into bonds stronger than blood.
            </p>
            <p>
              Somewhere along the way, Ramsha stopped being merely a friend. Through every random adventure, every bit of unnecessary chaos, and every late-night conversation, she became genuine family — the spirited, stubborn, caring, and slightly mad younger sister whom you can’t help but protect and root for unconditionally.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm italic font-cormorant text-lg">
              “She brings a storm of noise wherever she arrives, yet leaves behind a quiet warmth that stays long after.”
            </p>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs font-handwriting text-2xl text-gray-300">
            <span>— The Sister We Never Knew We Needed 🖤</span>
          </div>
        </div>

        {/* Right Column: High-End Magazine Quick Facts Card */}
        <div className="lg:col-span-5 w-full">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-xl">
            {/* Background luxury watermark */}
            <div className="absolute top-2 right-2 font-serif-luxury text-8xl font-black text-white/[0.03] select-none pointer-events-none">
              XVIII
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h3 className="font-cinzel text-sm sm:text-base tracking-[0.2em] font-semibold text-white uppercase">
                VITAL STATISTICS
              </h3>
              <Star className="w-4 h-4 text-gray-400 fill-current" />
            </div>

            <div className="space-y-3.5">
              {MAGAZINE_FACTS.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-white/5 group hover:border-white/20 transition-colors"
                >
                  <div className="text-left">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-sans-modern block">
                      {fact.label}
                    </span>
                    {fact.subtext && (
                      <span className="text-[10px] text-gray-400 font-sans-modern italic">
                        {fact.subtext}
                      </span>
                    )}
                  </div>
                  <span className="font-serif-luxury text-sm sm:text-base font-semibold text-gray-100 group-hover:text-white transition-colors text-right tracking-wide">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-3 text-center border-t border-white/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-sans-modern">
                VERIFIED OFFICIAL IDENTITY • CHAPTER 18
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer page mark */}
      <div className="w-full border-t border-white/10 pt-4 mt-8 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>THE RAMSHA EDITION</span>
        <span>SECTION: HER PROFILE & ESSENCE</span>
      </div>
    </section>
  );
}
