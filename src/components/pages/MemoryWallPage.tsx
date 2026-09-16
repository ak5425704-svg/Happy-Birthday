import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { MemoryPhoto } from '../../types';
import { Images, Plus, Maximize2, X, SlidersHorizontal, Loader2, Sparkles, Edit3, Camera } from 'lucide-react';
import {
  loadPhotos,
  uploadMultiplePhotos,
  updatePhoto,
  photoEvents,
  PHOTOS_UPDATED_EVENT,
  fileToDataURL,
} from '../../services/photoStorage';

interface MemoryWallPageProps {
  onOpenManager: () => void;
}

export function MemoryWallPage({ onOpenManager }: MemoryWallPageProps) {
  const [photos, setPhotos] = useState<MemoryPhoto[]>([]);
  const [lightboxPhoto, setLightboxPhoto] = useState<MemoryPhoto | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [editingPhoto, setEditingPhoto] = useState<MemoryPhoto | null>(null);
  const [editCaption, setEditCaption] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('Chapter 18');
  const [editImage, setEditImage] = useState<string | null>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Load photos on mount and listen for real-time updates
  useEffect(() => {
    let isMounted = true;
    loadPhotos().then((loaded) => {
      if (isMounted) setPhotos(loaded);
    });

    const handleUpdate = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setPhotos(e.detail);
      }
    };

    photoEvents.addEventListener(PHOTOS_UPDATED_EVENT, handleUpdate);
    return () => {
      isMounted = false;
      photoEvents.removeEventListener(PHOTOS_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const handleMultipleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) return;

    setIsUploading(true);
    setUploadPercent(15);
    try {
      const updated = await uploadMultiplePhotos(
        valid,
        'Unfiltered laughter frozen in time.',
        (p) => setUploadPercent(p)
      );
      setPhotos(updated);
    } catch (err) {
      console.error(err);
      alert('Photo upload failed. Please retry.');
    } finally {
      setIsUploading(false);
      setUploadPercent(0);
      if (multiFileInputRef.current) multiFileInputRef.current.value = '';
    }
  };

  const handleSaveCaption = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    const updated = await updatePhoto(editingPhoto.id, {
      title: editTitle.trim() || editingPhoto.title,
      caption: editCaption.trim() || editingPhoto.caption,
      date: editDate.trim() || editingPhoto.date || 'Chapter 18',
      ...(editImage ? { image: editImage } : {}),
    });
    setPhotos(updated);
    setEditingPhoto(null);
    setEditImage(null);
  };

  return (
    <section
      id="memories"
      className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl scroll-mt-24"
    >
      {/* Hidden Multiple File Input */}
      <input
        ref={multiFileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => handleMultipleFiles(e.target.files)}
      />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Images className="w-3.5 h-3.5 text-gray-300" />
          <span>VISUAL ARCHIVES • PERMANENT MEMORY GALLERY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
            {photos.length} Photos
          </span>
          <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 08</span>
        </div>
      </div>

      {/* Main Title Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 my-2">
        <div className="text-left space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400">
            <Sparkles className="w-3 h-3 text-gray-300" />
            Core Photographic Wall
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase">
            LITTLE MOMENTS. BIG MEMORIES.
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
            Polaroids, candid smiles, and chaotic adventures — stored permanently for years to come.
          </p>
        </div>

        {/* Action buttons: Add Multiple Photos & Open Management Center */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => multiFileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 border border-white text-xs font-sans-modern uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95 disabled:opacity-50"
            title="Upload multiple photos at once"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading ({uploadPercent}%)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photos</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenManager}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-sans-modern uppercase tracking-widest text-white flex items-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
            title="Manage photos, reorder, edit captions"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manage & Reorder</span>
            <span className="sm:hidden">Manage</span>
          </button>
        </div>
      </div>

      {/* Upload Progress Bar if active */}
      {isUploading && (
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden my-4">
          <div
            className="bg-white h-full transition-all duration-300"
            style={{ width: `${uploadPercent}%` }}
          />
        </div>
      )}

      {/* Photos Grid / Polaroids with Dynamic Rotation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="relative group transition-transform duration-300 hover:scale-[1.02] hover:z-20 text-left"
            style={{
              transform: `rotate(${photo.rotation ?? 0}deg)`,
            }}
          >
            {/* Polaroid style luxury black card frame */}
            <div className="p-3.5 pb-5 rounded-2xl bg-neutral-900/90 border border-white/20 shadow-2xl flex flex-col justify-between h-full backdrop-blur-md">
              {/* Image Container */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black mb-3">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />

                {/* Lightbox Trigger */}
                <button
                  onClick={() => setLightboxPhoto(photo)}
                  className="absolute bottom-2 left-2 p-1.5 rounded-full bg-black/70 hover:bg-black/95 text-white/90 hover:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Edit Caption & Photo Trigger */}
                <button
                  onClick={() => {
                    setEditingPhoto(photo);
                    setEditTitle(photo.title);
                    setEditCaption(photo.caption);
                    setEditDate(photo.date || 'Chapter 18');
                    setEditImage(null);
                  }}
                  className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black/95 text-white/90 hover:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                  title="Edit Caption & Photo"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Polaroid Caption */}
              <div className="space-y-1 px-1">
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-sans-modern uppercase tracking-widest">
                  <span>{photo.date || 'Chapter 18'}</span>
                  <span className="font-mono text-gray-500">#{idx + 1}</span>
                </div>
                <h4 className="font-serif-luxury text-base font-semibold text-white group-hover:silver-text-gradient transition-all truncate">
                  {photo.title}
                </h4>
                <p className="font-handwriting text-lg text-gray-300 leading-snug line-clamp-2">
                  “{photo.caption}”
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Caption & Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-md w-full glass-panel rounded-2xl border border-white/20 p-6 text-white shadow-2xl">
            {/* Hidden file input for single image replacement */}
            <input
              ref={editImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) {
                  const b64 = await fileToDataURL(f);
                  setEditImage(b64);
                }
              }}
            />

            <h3 className="font-cinzel text-lg font-bold mb-4">Edit Memory & Photo</h3>
            <form onSubmit={handleSaveCaption} className="space-y-4 text-left">
              {/* Photo Thumbnail & Replace Action */}
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-white/20">
                  <img
                    src={editImage || editingPhoto.image}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <button
                    type="button"
                    onClick={() => editImageInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-sans-modern flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Replace Photo</span>
                  </button>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {editImage ? 'New photo selected' : 'Permanent across all visitors'}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-black/60 border border-white/20 rounded-lg text-white font-sans-modern focus:outline-none focus:border-white/40"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                  Caption / Memory Note
                </label>
                <textarea
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-black/60 border border-white/20 rounded-lg text-white font-serif-luxury focus:outline-none focus:border-white/40"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                  Date / Chapter Label
                </label>
                <input
                  type="text"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  placeholder="e.g. Chapter 18, Summer 2025"
                  className="w-full px-3 py-2 text-sm bg-black/60 border border-white/20 rounded-lg text-white font-sans-modern focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPhoto(null);
                    setEditImage(null);
                  }}
                  className="px-4 py-2 text-xs uppercase tracking-wider rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs uppercase tracking-wider rounded-lg bg-white text-black font-semibold hover:bg-gray-200 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 cursor-pointer"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-black/50">
              <img
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="text-center mt-4 space-y-1">
              <h3 className="font-cinzel text-xl text-white font-bold tracking-wider">
                {lightboxPhoto.title}
              </h3>
              <p className="font-handwriting text-2xl text-gray-300">
                “{lightboxPhoto.caption}”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>PERMANENT PHOTO STORAGE • CHAPTER 18 ARCHIVES</span>
        <span>NEVER LOST ON REFRESH</span>
      </div>
    </section>
  );
}
