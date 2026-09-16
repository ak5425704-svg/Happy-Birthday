import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OpeningScreenProps {
  onEnter: () => void;
}

export function OpeningScreen({ onEnter }: OpeningScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 text-center select-none z-10">
      {/* Decorative luxury magazine border frame */}
      <div className="absolute inset-4 md:inset-8 border border-white/10 pointer-events-none flex flex-col justify-between p-4 md:p-6">
        <div className="flex justify-between items-center text-[10px] md:text-xs tracking-[0.35em] text-white/40 uppercase font-sans-modern">
          <span>Vol. XVIII • Edition No. 1</span>
          <span>A Private Issue</span>
        </div>
        <div className="flex justify-between items-center text-[10px] md:text-xs tracking-[0.35em] text-white/40 uppercase font-sans-modern">
          <span>The Collector's Piece</span>
          <span>September 2026</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto flex flex-col items-center relative"
      >
        {/* Subtle sub-heading */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 0.7, letterSpacing: '0.45em' }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-xs md:text-sm uppercase text-gray-400 font-sans-modern tracking-[0.45em] mb-4 flex items-center gap-2"
        >
          <span className="w-8 h-px bg-white/20" />
          <span>The Digital Monograph</span>
          <span className="w-8 h-px bg-white/20" />
        </motion.div>

        {/* Name in Grand Serif */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="font-cinzel text-5xl sm:text-7xl md:text-8xl tracking-[0.18em] text-white font-bold my-1 drop-shadow-[0_10px_35px_rgba(255,255,255,0.12)]"
        >
          RAMSHA
        </motion.h1>

        {/* Big Stylized "18" with smoke glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          className="relative my-4"
        >
          <span className="font-serif-luxury text-7xl sm:text-9xl md:text-[140px] font-bold leading-none silver-text-gradient tracking-tight block">
            18
          </span>
          <div className="absolute inset-0 flex items-center justify-center -z-10 blur-3xl opacity-30 bg-gradient-to-r from-gray-500 via-white to-gray-400 rounded-full" />
        </motion.div>

        {/* Chapter 18 begins... */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-gray-300 font-light tracking-wide mb-10"
        >
          “Chapter 18 begins…”
        </motion.p>

        {/* Enter Her World Button */}
        <motion.button
          id="enter-world-button"
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
          whileTap={{ scale: 0.97 }}
          className="group relative px-8 sm:px-10 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-pointer flex items-center gap-3 overflow-hidden"
        >
          {/* Subtle light sheen on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
          <span className="font-sans-modern tracking-[0.25em] text-xs sm:text-sm font-semibold uppercase text-gray-200 group-hover:text-white">
            Enter Her World
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.4, delay: 1.3 }}
          className="mt-12 text-[11px] text-gray-400 tracking-[0.2em] uppercase font-sans-modern"
        >
          A tribute to our favorite chaos creator
        </motion.div>
      </motion.div>
    </div>
  );
}
