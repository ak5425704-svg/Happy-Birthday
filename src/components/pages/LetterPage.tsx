import { Mail, Sparkles, Heart } from 'lucide-react';

export function LetterPage() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-14 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Mail className="w-3.5 h-3.5 text-gray-300" />
          <span>PERSONAL CORRESPONDENCE • A SISTER’S LETTER</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 14</span>
      </div>

      {/* Letter Content Styled as a Luxury Monograph Document */}
      <div className="max-w-2xl mx-auto my-auto text-left space-y-6 bg-white/[0.02] border border-white/10 p-6 sm:p-10 rounded-2xl relative shadow-xl">
        {/* Top Date & Salutation */}
        <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
          <span className="font-serif-luxury italic text-xl sm:text-2xl text-white">
            Dear Ramsha,
          </span>
          <span className="text-[10px] uppercase tracking-widest font-mono text-gray-400">
            CHAPTER 18 • 2026
          </span>
        </div>

        {/* The Body Paragraphs */}
        <div className="space-y-4 font-sans-modern text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          <p>
            Watching someone grow through the unpredictable phases of life is a rare privilege. Seeing you step into 18 with so much courage, genuine laughter, and your own distinct aesthetic is something truly special to witness.
          </p>
          <p>
            You have a whole world of uncharted chapters ahead of you — new places you will travel to, dreams you will chase down, and mountains you will climb. But through every new triumph and every passing year, there is one thing that will never change: you will always have that slightly chaotic, fiercely funny, lovable younger-sister energy that keeps everyone on their toes.
          </p>
          <p>
            Never dilute your magic to fit into quiet rooms. Keep laughing loudly, keep making spontaneous plans, keep loving black, and never stop being the wonderfully crazy soul you are today.
          </p>
          <p>
            No matter how tall you stand or where life takes you, remember that you always have someone rooting for you, ready to back your plays, and proud to call you family.
          </p>
        </div>

        {/* Sign-off in Handwritten Style */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-end text-right space-y-1">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-sans-modern">
            With unconditional love & pride,
          </span>
          <span className="font-handwriting text-3xl sm:text-4xl text-white pt-1">
            Your Friend & Family 🖤
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>SEALED WITH HONESTY & AFFECTION</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
