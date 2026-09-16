import { useState } from 'react';
import { DEFAULT_ROAM_PLACES, ROAM_QUOTES } from '../../data/magazineContent';
import { RoamPlace } from '../../types';
import { Compass, Camera, Sparkles, MapPin } from 'lucide-react';
import { ImageUploaderModal } from '../ImageUploaderModal';
import { getStoredItem, setStoredItem } from '../../utils/storage';

export function RoamPage() {
  const [places, setPlaces] = useState<RoamPlace[]>(() =>
    getStoredItem('roam_places', DEFAULT_ROAM_PLACES)
  );
  const [editingPlace, setEditingPlace] = useState<RoamPlace | null>(null);

  const handleSavePlacePhoto = (newImgUrl: string) => {
    if (!editingPlace) return;
    const updated = places.map((p) =>
      p.id === editingPlace.id ? { ...p, image: newImgUrl } : p
    );
    setPlaces(updated);
    setStoredItem('roam_places', updated);
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Compass className="w-3.5 h-3.5 text-gray-300" />
          <span>EXPEDITIONS & WANDERLUST • THE GHOOMNA DIARIES</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 07</span>
      </div>

      {/* Title & Editorial Lead */}
      <div className="text-center max-w-3xl mx-auto my-3 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
          THE FREE SPIRIT
        </span>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-wide text-white uppercase">
          SHE WAS MADE TO ROAM
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
          Born with an unquenchable urge to explore, wander, and say yes to every spontaneous road trip.
        </p>
      </div>

      {/* The 3 Travel Quotes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {ROAM_QUOTES.map((quote, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-white/10 bg-white/[0.03] text-left space-y-1"
          >
            <Sparkles className="w-3 h-3 text-gray-400" />
            <p className="font-serif-luxury italic text-sm text-gray-200 leading-snug">
              “{quote}”
            </p>
          </div>
        ))}
      </div>

      {/* Places / Memories Cards Grid */}
      <div className="my-4 space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-cinzel text-sm sm:text-base font-semibold tracking-wider text-gray-200 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>EXPEDITION ARCHIVE • TAP TO PERSONALIZE PHOTO</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 glass-panel flex flex-col justify-end min-h-[260px] sm:min-h-[300px] shadow-xl text-left"
            >
              {/* Image */}
              <img
                src={place.image}
                alt={place.location}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

              {/* Edit button */}
              <button
                onClick={() => setEditingPlace(place)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-lg z-10"
                title="Change Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>

              {/* Card info */}
              <div className="relative z-10 p-5 space-y-1.5">
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 font-sans-modern inline-block">
                  {place.dateOrTag}
                </span>
                <h4 className="font-cinzel text-base sm:text-lg font-bold text-white leading-snug">
                  {place.location}
                </h4>
                <p className="text-xs text-gray-300 font-sans-modern font-light leading-relaxed">
                  {place.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>NEXT STOP: ANYWHERE SHE HASN’T CONQUERED YET</span>
        <span>THE RAMSHA EDITION</span>
      </div>

      <ImageUploaderModal
        isOpen={!!editingPlace}
        onClose={() => setEditingPlace(null)}
        title={`Change Photo for: ${editingPlace?.location || ''}`}
        currentImage={editingPlace?.image || ''}
        onSave={handleSavePlacePhoto}
      />
    </section>
  );
}
