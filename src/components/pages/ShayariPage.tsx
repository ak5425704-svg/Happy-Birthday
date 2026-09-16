import { Feather, Sparkles, Heart } from 'lucide-react';

export function ShayariPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-14 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Feather className="w-3.5 h-3.5 text-gray-300" />
          <span>POETRY SPREAD • URDU / HINGLISH SHAYARI</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 15</span>
      </div>

      {/* Centered Editorial Poetry Spread */}
      <div className="max-w-2xl mx-auto my-auto text-center space-y-8 relative z-10 py-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-gray-400">
          <Sparkles className="w-3 h-3 text-gray-300" />
          Nazam & Alfaaz
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold tracking-[0.16em] text-white uppercase">
          CHAND ASH’AAR RAMSHA KE NAAM
        </h2>

        {/* Poetry Card in Serif Luxury Calligraphy-Inspired Typography */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 glass-panel relative shadow-2xl space-y-8">
          <div className="text-gray-500 font-serif-luxury text-4xl select-none leading-none -mb-4">
            “
          </div>

          <div className="space-y-4 font-serif-luxury text-lg sm:text-2xl text-gray-100 font-normal leading-relaxed tracking-wide italic">
            <p>
              Na jaane kitne rang samete ho apne andaaz mein,
            </p>
            <p>
              Ek saadgi si jhalakti hai tumhare har alfaaz mein.
            </p>
            <p>
              Kuch toh baat hai tumhari is masoom si awaaz mein,
            </p>
            <p>
              Ke khushi khud nazar aati hai tumhare har andaaz mein.
            </p>
          </div>

          <div className="w-16 h-px bg-white/20 mx-auto" />

          <div className="space-y-3 font-serif-luxury text-lg sm:text-2xl text-gray-200 font-normal leading-relaxed tracking-wide italic">
            <p>
              Ye chand ash'aar qubool kar lena, bas itni si hai guzarish,
            </p>
            <p className="silver-text-gradient font-semibold">
              Tum yunhi khush raho hamesha—meri taraf se yahi hai khwahish.
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 pt-2">
            <Heart className="w-4 h-4 fill-current text-white/80" />
            <span className="font-handwriting text-2xl text-gray-300">
              Duaayein hamesha tumhare saath
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern relative z-10">
        <span>KHANDANI SHAYARI • WRITTEN FOR CHAPTER 18</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
