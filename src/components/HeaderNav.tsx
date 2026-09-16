import { useState, useEffect } from 'react';
import {
  Music2,
  Volume2,
  Camera,
  Menu,
  Sparkles,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';

interface HeaderNavProps {
  onOpenPhotoManager: () => void;
  onOpenSectionIndex: () => void;
  photoCount: number;
}

export function HeaderNav({
  onOpenPhotoManager,
  onOpenSectionIndex,
  photoCount,
}: HeaderNavProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSection, setActiveSection] = useState('cover');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      ambientSound.stop();
      setIsPlayingAudio(false);
    } else {
      ambientSound.play();
      setIsPlayingAudio(true);
    }
  };

  const navLinks = [
    { id: 'cover', label: 'Cover' },
    { id: 'about', label: 'Story' },
    { id: 'cravings', label: 'Cravings' },
    { id: 'music', label: 'Playlist' },
    { id: 'roam', label: 'Wanderlust' },
    { id: 'memories', label: 'Memories' },
    { id: 'bond', label: 'Our Bond' },
    { id: 'letter', label: 'Letter' },
    { id: 'wishes', label: 'Wishes' },
  ];

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const item = navLinks[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-3 sm:px-6 py-3 glass-panel border-b border-white/10 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand mark & Home anchor */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('cover')}
            className="text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-sm sm:text-base tracking-[0.2em] text-white font-black group-hover:silver-text-gradient transition-all">
                RAMSHA • XVIII
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[9px] uppercase tracking-widest text-gray-300 font-sans-modern">
                18th Birthday
              </span>
            </div>
            <span className="text-[9px] text-gray-400 font-sans-modern tracking-widest uppercase block -mt-0.5">
              The Digital Edition
            </span>
          </button>
        </div>

        {/* Center: Desktop Quick Section Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/10">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-sans-modern tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Photos Admin, All Sections Index, Audio) */}
        <div className="flex items-center gap-2">
          {/* Photo Management Center Trigger */}
          <button
            id="open-photo-manager-btn"
            onClick={onOpenPhotoManager}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-2 text-xs font-sans-modern uppercase tracking-wider transition-all cursor-pointer shadow-md"
            title="Upload & Manage Photos"
          >
            <Camera className="w-3.5 h-3.5 text-gray-200" />
            <span className="hidden sm:inline">Photos</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white text-black text-[10px] font-mono font-bold">
              {photoCount}
            </span>
          </button>

          {/* Table of Sections Modal Trigger */}
          <button
            onClick={onOpenSectionIndex}
            className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center gap-1.5 text-xs font-sans-modern uppercase tracking-wider transition-all cursor-pointer"
            title="View All 20 Sections"
          >
            <BookOpen className="w-3.5 h-3.5 text-gray-300" />
            <span className="hidden md:inline">Sections</span>
          </button>

          {/* Ambient Soundtrack Toggle */}
          <button
            id="ambient-sound-toggle"
            onClick={toggleAmbientSound}
            className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
              isPlayingAudio
                ? 'bg-white text-black border-white shadow-lg'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/15 hover:text-white'
            }`}
            title={isPlayingAudio ? 'Mute Soundtrack' : 'Play Soundtrack'}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden xl:inline text-[10px] font-mono font-semibold uppercase">
                  Sound on
                </span>
              </>
            ) : (
              <>
                <Music2 className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[10px] font-sans-modern uppercase tracking-wider">
                  Audio
                </span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer"
            title="Toggle Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden pt-3 pb-2 px-2 border-t border-white/10 mt-3 flex flex-wrap gap-1.5 bg-black/80 rounded-2xl p-3">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-gray-300 font-sans-modern uppercase tracking-wider"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSectionIndex();
            }}
            className="w-full text-center py-2 mt-1 rounded-lg bg-white/10 text-xs text-white uppercase tracking-wider font-semibold"
          >
            View All 20 Chapters
          </button>
        </div>
      )}
    </header>
  );
}
