import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ImageUploaderModal } from '../ImageUploaderModal';
import { getStoredItem, setStoredItem } from '../../utils/storage';
import { replacePhotoSlot, photoEvents, SLOTS_UPDATED_EVENT } from '../../services/photoStorage';
import { PhotoSlot } from '../../types';

const DEFAULT_SPOTLIGHT_IMAGE = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop';

export function PhotoMessagePage() {
  const [photo, setPhoto] = useState<string>(() =>
    getStoredItem('spotlight_photo', DEFAULT_SPOTLIGHT_IMAGE)
  );
  const [caption, setCaption] = useState<string>(() =>
    getStoredItem(
      'spotlight_caption',
      'Years from now, these little moments will become the memories we smile about.'
    )
  );
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState(caption);

  useEffect(() => {
    // Check photo slots for slot-2
    fetch('/api/photos/slots')
      .then((res) => res.json())
      .then((data) => {
        if (data?.slots) {
          const slot2 = data.slots.find((s: PhotoSlot) => s.id === 'slot-2' || s.slotNumber === 2);
          if (slot2?.image) {
            setPhoto(slot2.image);
            setStoredItem('spotlight_photo', slot2.image);
          }
          if (slot2?.caption) {
            setCaption(slot2.caption);
            setTempCaption(slot2.caption);
            setStoredItem('spotlight_caption', slot2.caption);
          }
          return;
        }

        // Fallback to settings
        fetch('/api/settings')
          .then((r) => r.json())
          .then((sData) => {
            if (sData?.settings?.spotlightPhoto) {
              setPhoto(sData.settings.spotlightPhoto);
              setStoredItem('spotlight_photo', sData.settings.spotlightPhoto);
            }
            if (sData?.settings?.spotlightCaption) {
              setCaption(sData.settings.spotlightCaption);
              setStoredItem('spotlight_caption', sData.settings.spotlightCaption);
            }
          })
          .catch(() => {});
      })
      .catch(() => {});

    const handleSlotsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PhotoSlot[]>;
      if (customEvent.detail) {
        const slot2 = customEvent.detail.find((s) => s.id === 'slot-2' || s.slotNumber === 2);
        if (slot2?.image) {
          setPhoto(slot2.image);
          setStoredItem('spotlight_photo', slot2.image);
        }
        if (slot2?.caption) {
          setCaption(slot2.caption);
          setTempCaption(slot2.caption);
          setStoredItem('spotlight_caption', slot2.caption);
        }
      }
    };

    photoEvents.addEventListener(SLOTS_UPDATED_EVENT, handleSlotsUpdate);
    return () => {
      photoEvents.removeEventListener(SLOTS_UPDATED_EVENT, handleSlotsUpdate);
    };
  }, []);

  const handleSavePhoto = async (newImgUrl: string) => {
    setPhoto(newImgUrl);
    setStoredItem('spotlight_photo', newImgUrl);
    try {
      await replacePhotoSlot('slot-2', { image: newImgUrl });
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spotlightPhoto: newImgUrl }),
      });
    } catch {
      // ignore
    }
  };

  const handleSaveCaption = async (e: React.FormEvent) => {
    e.preventDefault();
    setCaption(tempCaption);
    setStoredItem('spotlight_caption', tempCaption);
    setIsEditingCaption(false);
    try {
      await replacePhotoSlot('slot-2', { caption: tempCaption });
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spotlightCaption: tempCaption }),
      });
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="spotlight"
      className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl scroll-mt-24"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <ImageIcon className="w-3.5 h-3.5 text-gray-300" />
          <span>CINEMATIC SPOTLIGHT • TIME CAPSULE</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 18</span>
      </div>

      {/* Centerpiece Full-bleed cinematic photo frame */}
      <div className="relative w-full max-w-4xl mx-auto my-auto aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between p-6 sm:p-10 group text-left">
        {/* Background photo */}
        <img
          src={photo}
          alt="Cinematic Memory"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 opacity-90" />

        {/* Top Tag & Change Photo */}
        <div className="relative z-10 flex justify-between items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] uppercase tracking-[0.25em] text-gray-300 font-sans-modern backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-white" />
            CORE ARCHIVE
          </span>

          <button
            onClick={() => setIsEditingPhoto(true)}
            className="px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/95 border border-white/20 text-[11px] font-sans-modern tracking-widest text-white/90 backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Customize Photo</span>
          </button>
        </div>

        {/* Bottom Cinematic Typography Overlay */}
        <div className="relative z-10 space-y-3 max-w-2xl">
          {isEditingCaption ? (
            <form onSubmit={handleSaveCaption} className="space-y-2">
              <input
                type="text"
                value={tempCaption}
                onChange={(e) => setTempCaption(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-black/80 border border-white/20 rounded-lg text-white font-serif-luxury"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-md uppercase tracking-wider cursor-pointer"
                >
                  Save Caption
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingCaption(false)}
                  className="px-3 py-1 bg-white/10 text-white text-xs rounded-md uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              onClick={() => setIsEditingCaption(true)}
              className="cursor-pointer group/caption"
              title="Click to edit caption"
            >
              <p className="font-serif-luxury italic text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-wide leading-snug drop-shadow-lg">
                “{caption}”
              </p>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-sans-modern opacity-0 group-hover/caption:opacity-100 transition-opacity mt-1 block">
                ✎ Click to edit message
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-1 text-[11px] uppercase tracking-widest text-gray-300 font-sans-modern">
            <span>RAMSHA</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>CHAPTER 18</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>ETERNAL</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>FROZEN IN TIME</span>
        <span>THE RAMSHA EDITION</span>
      </div>

      <ImageUploaderModal
        isOpen={isEditingPhoto}
        onClose={() => setIsEditingPhoto(false)}
        title="Update Cinematic Photo"
        currentImage={photo}
        onSave={handleSavePhoto}
      />
    </section>
  );
}
