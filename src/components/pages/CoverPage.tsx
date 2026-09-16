import { useState, useEffect } from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { ImageUploaderModal } from '../ImageUploaderModal';
import { getStoredItem, setStoredItem } from '../../utils/storage';
import { replacePhotoSlot, photoEvents, SLOTS_UPDATED_EVENT } from '../../services/photoStorage';
import { PhotoSlot } from '../../types';

const DEFAULT_COVER_IMAGE = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop';

export function CoverPage() {
  const [coverPhoto, setCoverPhoto] = useState<string>(() =>
    getStoredItem('cover_photo', DEFAULT_COVER_IMAGE)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check server for saved cover photo or slot-1
    fetch('/api/photos/slots')
      .then((res) => res.json())
      .then((data) => {
        if (data?.slots) {
          const slot1 = data.slots.find((s: PhotoSlot) => s.id === 'slot-1' || s.slotNumber === 1);
          if (slot1?.image) {
            setCoverPhoto(slot1.image);
            setStoredItem('cover_photo', slot1.image);
            return;
          }
        }
        // Fallback to settings
        fetch('/api/settings')
          .then((r) => r.json())
          .then((sData) => {
            if (sData?.settings?.coverPhoto) {
              setCoverPhoto(sData.settings.coverPhoto);
              setStoredItem('cover_photo', sData.settings.coverPhoto);
            }
          })
          .catch(() => {});
      })
      .catch(() => {});

    const handleSlotsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PhotoSlot[]>;
      if (customEvent.detail) {
        const slot1 = customEvent.detail.find((s) => s.id === 'slot-1' || s.slotNumber === 1);
        if (slot1?.image) {
          setCoverPhoto(slot1.image);
          setStoredItem('cover_photo', slot1.image);
        }
      }
    };

    photoEvents.addEventListener(SLOTS_UPDATED_EVENT, handleSlotsUpdate);
    return () => {
      photoEvents.removeEventListener(SLOTS_UPDATED_EVENT, handleSlotsUpdate);
    };
  }, []);

  const handleUpdatePhoto = async (newImg: string) => {
    setCoverPhoto(newImg);
    setStoredItem('cover_photo', newImg);
    try {
      await replacePhotoSlot('slot-1', { image: newImg });
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverPhoto: newImg }),
      });
    } catch {
      // ignore
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cover"
      className="relative w-full min-h-[90vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl scroll-mt-24"
    >
      {/* Top Header Masthead */}
      <div className="w-full border-b border-white/10 pb-4 mb-6">
        <div className="flex justify-between items-center text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.4em] uppercase text-gray-400 font-sans-modern">
          <span>CHAPTER NO. 18 • SPECIAL EDITION</span>
          <span className="hidden sm:inline">VOGUE & CHAOS ARCHIVES</span>
          <span>SEPTEMBER 2026</span>
        </div>

        {/* Big Masthead Title */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.14em] text-center font-black mt-4 mb-2 silver-text-gradient drop-shadow-lg">
          THE RAMSHA EDITION
        </h1>

        <div className="flex justify-center items-center gap-4 text-center">
          <span className="h-px w-12 sm:w-20 bg-white/20" />
          <span className="font-cinzel tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-300">
            CHAPTER 18
          </span>
          <span className="h-px w-12 sm:w-20 bg-white/20" />
        </div>
      </div>

      {/* Centerpiece: Large Portrait & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-4">
        {/* Left Column: Highlights */}
        <div className="lg:col-span-4 order-2 lg:order-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400">
            <Sparkles className="w-3 h-3 text-gray-300" />
            Special Feature
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 block font-sans-modern">
              The Tribute
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium leading-tight">
              Happy Birthday, <br />
              <span className="italic silver-text-gradient font-bold">Ramsha 🖤</span>
            </h2>
            <p className="font-cormorant italic text-lg sm:text-xl text-gray-300 pt-1">
              “18 years of being effortlessly herself.”
            </p>
          </div>

          <div className="border-l-2 border-white/20 pl-4 py-1 space-y-1">
            <p className="text-xs text-gray-400 tracking-wide font-sans-modern leading-relaxed">
              Unfiltered honesty, infectious laughter, midnight cravings, and an innate talent for turning ordinary days into unforgettable stories.
            </p>
          </div>

          {/* Quick Section Anchors */}
          <div className="pt-2 space-y-2 text-[11px] uppercase tracking-widest font-sans-modern text-gray-400">
            <button
              onClick={() => scrollToSection('cravings')}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left w-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>Section 04 — The Holy Trinity: Biryani, Pizza & Dimag</span>
            </button>
            <button
              onClick={() => scrollToSection('music')}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left w-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>Section 06 — Teri Deewani On Endless Repeat</span>
            </button>
            <button
              onClick={() => scrollToSection('awards')}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left w-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>Section 11 — 2026 Kand Awards Ceremony</span>
            </button>
          </div>
        </div>

        {/* Center/Right Column: Large Portrait */}
        <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-center">
          <div className="relative group w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-neutral-950">
            <img
              src={coverPhoto}
              alt="Ramsha 18th Birthday Cover"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />

            {/* Tap to change photo overlay button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[11px] font-sans-modern tracking-widest text-white/90 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Change Portrait</span>
            </button>

            {/* Overlay banner at bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 block font-sans-modern">
                  PORTRAIT NO. 18
                </span>
                <span className="font-cinzel text-xl sm:text-2xl text-white font-bold tracking-wider">
                  RAMSHA
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[11px] text-gray-200">
                <Heart className="w-3.5 h-3.5 fill-current text-white/80" />
                <span>XVIII</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Barcode, Details */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] tracking-widest uppercase font-sans-modern">
        <div>THE EXCLUSIVE COMMEMORATIVE EDITION • FOR RAMSHA</div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-tighter text-gray-400">||| | |||| | || |||| |</span>
          <span>18-09-2026-CH18</span>
        </div>
      </div>

      <ImageUploaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Cover Portrait"
        currentImage={coverPhoto}
        onSave={handleUpdatePhoto}
      />
    </section>
  );
}
