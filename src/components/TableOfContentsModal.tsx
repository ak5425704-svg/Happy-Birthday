import { X, Compass, ChevronRight } from 'lucide-react';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSectionIndex?: number;
  onSelectSection: (sectionIndex: number) => void;
}

export const PAGES_CATALOG = [
  { index: 0, id: 'cover', title: 'THE RAMSHA EDITION', subtitle: 'The Official Cover • Chapter 18', tag: 'HERO' },
  { index: 1, id: 'about', title: 'ABOUT RAMSHA', subtitle: 'Profile, Vibe & Sister Bond', tag: 'PROFILE' },
  { index: 2, id: 'personality', title: 'HER PERSONALITY', subtitle: 'The Girl Behind The Chaos', tag: 'CHARACTER' },
  { index: 3, id: 'cravings', title: 'SIMPLY HER CRAVINGS', subtitle: 'Biryani, Pizza & Thoda Sa Dimag', tag: 'FOOD' },
  { index: 4, id: 'aesthetic', title: 'BLACK ISN\'T JUST A COLOUR', subtitle: 'An Entire Aesthetic & Soul', tag: 'AESTHETIC' },
  { index: 5, id: 'music', title: 'TERI DEEWANI', subtitle: 'Her Anthem & Emotional Beat', tag: 'MUSIC' },
  { index: 6, id: 'roam', title: 'SHE WAS MADE TO ROAM', subtitle: 'Travel, Streets & Wandering', tag: 'JOURNEYS' },
  { index: 7, id: 'memories', title: 'THE MEMORY WALL', subtitle: 'Little Moments, Big Memories', tag: 'GALLERY' },
  { index: 8, id: 'quotes', title: 'ICONIC RAMSHA', subtitle: 'Quotes, Kand & Catchphrases', tag: 'HUMOR' },
  { index: 9, id: 'bond', title: 'OUR BOND', subtitle: 'From Friends to Family & Sisterhood', tag: 'TRIBUTE' },
  { index: 10, id: 'awards', title: 'FUNNY AWARDS CEREMONY', subtitle: 'Official Titles & Fake Trophies', tag: 'AWARDS' },
  { index: 11, id: 'essence', title: 'IF RAMSHA WERE...', subtitle: 'Hypothetical Essence Match', tag: 'PLAYFUL' },
  { index: 12, id: 'facts', title: '18 DEFINING TRAITS', subtitle: 'Every Little Quirky Quality', tag: 'FACTS' },
  { index: 13, id: 'letter', title: 'A LITTLE LETTER', subtitle: 'Warm Words for Her 18th Year', tag: 'LETTER' },
  { index: 14, id: 'poetry', title: 'URDU SHAYARI', subtitle: 'Poetic Ode in Silver Typography', tag: 'POETRY' },
  { index: 15, id: 'wishes', title: '18 BIRTHDAY WISHES', subtitle: 'One Heartfelt Wish for Each Year', tag: 'WISHES' },
  { index: 16, id: 'bucket-list', title: 'HER BUCKET LIST', subtitle: 'Dreams, Adventures & Kand Goals', tag: 'GOALS' },
  { index: 17, id: 'spotlight', title: 'PHOTO & MESSAGE', subtitle: 'Cinematic Portrait & Core Memory', tag: 'SPOTLIGHT' },
  { index: 18, id: 'valediction', title: 'BEFORE THIS CHAPTER ENDS', subtitle: 'The Final Emotional Message', tag: 'BLESSING' },
  { index: 19, id: 'epilogue', title: 'EPILOGUE', subtitle: 'Ramsha — Chapter 18 • Replay & Back to Top', tag: 'FINALE' },
];

export function TableOfContentsModal({
  isOpen,
  onClose,
  activeSectionIndex = 0,
  onSelectSection,
}: TableOfContentsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl max-h-[85vh] glass-panel rounded-3xl border border-white/15 text-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-gray-300" />
            <div>
              <h3 className="font-cinzel text-lg tracking-[0.15em] font-semibold text-white">
                WEBSITE DIRECTORY
              </h3>
              <p className="text-[11px] font-sans-modern tracking-widest text-gray-400 uppercase">
                The Ramsha 18th Birthday Tribute • 20 Sections
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list of 20 sections */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-2 divide-y divide-white/5">
          {PAGES_CATALOG.map((item) => {
            const isCurrent = activeSectionIndex === item.index;
            return (
              <button
                key={item.index}
                onClick={() => {
                  onSelectSection(item.index);
                  onClose();
                }}
                className={`w-full text-left pt-3 pb-2.5 px-3.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                  isCurrent
                    ? 'bg-white/10 border border-white/20'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs md:text-sm font-bold tracking-wider ${
                      isCurrent ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                    }`}
                  >
                    {String(item.index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-xs md:text-sm font-semibold tracking-wider text-gray-100 group-hover:text-white">
                        {item.title}
                      </span>
                      <span className="text-[9px] font-sans-modern tracking-widest px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-sans-modern">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-200 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
