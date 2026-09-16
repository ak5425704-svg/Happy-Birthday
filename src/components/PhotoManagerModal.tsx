import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Layers,
  Camera,
  RefreshCw,
} from 'lucide-react';
import { MemoryPhoto, PhotoSlot } from '../types';
import {
  uploadMultiplePhotos,
  deletePhoto,
  reorderPhotos,
  updatePhoto,
  loadPhotoSlots,
  replacePhotoSlot,
  photoEvents,
  SLOTS_UPDATED_EVENT,
  fileToDataURL,
} from '../services/photoStorage';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: MemoryPhoto[];
  onPhotosChange: (updated: MemoryPhoto[]) => void;
}

export function PhotoManagerModal({
  isOpen,
  onClose,
  photos,
  onPhotosChange,
}: PhotoManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'slots' | 'gallery'>('slots');
  const [slots, setSlots] = useState<PhotoSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);
  const [savingSlotId, setSavingSlotId] = useState<string | null>(null);

  // Gallery states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempCaption, setTempCaption] = useState('');
  const [tempTitle, setTempTitle] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const slotFileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlotForUpload, setActiveSlotForUpload] = useState<string | null>(null);

  // Load photo slots
  useEffect(() => {
    let mounted = true;
    loadPhotoSlots().then((loaded) => {
      if (mounted) {
        setSlots(loaded);
        setIsLoadingSlots(false);
      }
    });

    const handleSlotsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PhotoSlot[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setSlots(customEvent.detail);
      }
    };

    photoEvents.addEventListener(SLOTS_UPDATED_EVENT, handleSlotsUpdate);
    return () => {
      mounted = false;
      photoEvents.removeEventListener(SLOTS_UPDATED_EVENT, handleSlotsUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Replace image for specific slot
  const handleSlotFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlotForUpload) return;

    try {
      setSavingSlotId(activeSlotForUpload);
      const base64 = await fileToDataURL(file);
      const updated = await replacePhotoSlot(activeSlotForUpload, { image: base64 });
      setSlots(updated);
      showStatus(`Slot #${activeSlotForUpload.replace('slot-', '')} photo updated globally!`);
    } catch (err) {
      console.error(err);
      alert('Failed to update slot photo.');
    } finally {
      setSavingSlotId(null);
      setActiveSlotForUpload(null);
      if (slotFileInputRef.current) slotFileInputRef.current.value = '';
    }
  };

  // Save metadata for specific slot
  const handleSaveSlotDetails = async (
    slotId: string,
    title: string,
    caption: string,
    date: string
  ) => {
    try {
      setSavingSlotId(slotId);
      const updated = await replacePhotoSlot(slotId, { title, caption, date });
      setSlots(updated);
      showStatus('Slot information saved globally!');
    } catch (err) {
      console.error(err);
      alert('Failed to save slot information.');
    } finally {
      setSavingSlotId(null);
    }
  };

  // Gallery bulk upload
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      alert('Please select valid image files.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      const updated = await uploadMultiplePhotos(
        fileArray,
        'Little moments. Big memories.',
        (percent) => setUploadProgress(percent)
      );
      onPhotosChange(updated);
      showStatus(`Successfully added ${fileArray.length} photo${fileArray.length > 1 ? 's' : ''}!`);
    } catch (err) {
      console.error(err);
      alert('Failed to upload photos. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo from the permanent gallery?')) {
      return;
    }
    const updated = await deletePhoto(id);
    onPhotosChange(updated);
    showStatus('Photo deleted.');
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const reordered = [...photos];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    const updated = await reorderPhotos(reordered);
    onPhotosChange(updated);
  };

  const startEditing = (photo: MemoryPhoto) => {
    setEditingId(photo.id);
    setTempTitle(photo.title);
    setTempCaption(photo.caption);
  };

  const saveEditing = async (id: string) => {
    const updated = await updatePhoto(id, {
      title: tempTitle.trim() || 'Memory',
      caption: tempCaption.trim() || 'Cherished moment.',
    });
    onPhotosChange(updated);
    setEditingId(null);
    showStatus('Caption saved permanently.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      {/* Hidden file input for slot photo replacements */}
      <input
        ref={slotFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSlotFileChange}
      />

      <div className="relative w-full max-w-5xl max-h-[92vh] glass-panel rounded-3xl border border-white/20 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
        {/* Header with Tabs */}
        <div className="px-5 sm:px-8 py-4 border-b border-white/10 bg-black/70 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 border border-white/15">
              <ImageIcon className="w-5 h-5 text-gray-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg sm:text-xl tracking-[0.12em] font-bold text-white">
                  GLOBAL PHOTO SYSTEM
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] uppercase font-mono tracking-wider text-gray-300">
                  Chapter 18 Edition
                </span>
              </div>
              <p className="text-xs font-sans-modern text-gray-400">
                Persistent Admin Storage • Permanent across every visitor session
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('slots')}
              className={`px-4 py-1.5 rounded-xl text-xs font-sans-modern uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'slots'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>6 Official Slots</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-1.5 rounded-xl text-xs font-sans-modern uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Memory Gallery ({photos.length})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="hidden sm:block p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 py-2 px-6 flex items-center justify-center gap-2 text-xs font-sans-modern text-emerald-200">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab 1: 6 Curated Global Slots */}
        {activeTab === 'slots' && (
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-white/10">
              <div>
                <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
                  CURATED GLOBAL PHOTO SLOTS (1 TO 6)
                </h4>
                <p className="text-xs text-gray-400 font-sans-modern">
                  These 6 key photo slots anchor the website: Cover, Time Capsule, and 4 Memory Polaroids. Replace any photo below to update it for all visitors permanently.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                6 / 6 Defined
              </span>
            </div>

            {isLoadingSlots ? (
              <div className="py-16 text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-white/50" />
                <p className="text-xs text-gray-400 font-mono">Loading global photo slots...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {slots.map((slot) => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    isSaving={savingSlotId === slot.id}
                    onReplaceImage={() => {
                      setActiveSlotForUpload(slot.id);
                      slotFileInputRef.current?.click();
                    }}
                    onSaveDetails={(title, caption, date) =>
                      handleSaveSlotDetails(slot.id, title, caption, date)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Memory Gallery Photos */}
        {activeTab === 'gallery' && (
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            {/* Multiple Photo Dropzone & Upload Button */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
                isDragging
                  ? 'border-white bg-white/10 scale-[1.01]'
                  : 'border-white/20 bg-white/[0.03] hover:border-white/40 hover:bg-white/[0.05]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />

              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <h4 className="font-serif-luxury text-lg text-white font-medium">
                    {isUploading ? 'Uploading & Persisting Photos...' : 'Upload Photos (Single or Multiple)'}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans-modern max-w-md mx-auto pt-1">
                    Drag & drop multiple photos here, or click the button below. Photos are permanently stored on the server.
                  </p>
                </div>

                {isUploading ? (
                  <div className="w-full max-w-xs space-y-1.5 pt-2">
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-white h-full transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">
                      Processing: {uploadProgress}%
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs font-sans-modern uppercase tracking-widest hover:bg-gray-200 transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    Select Photos From Device
                  </button>
                )}
              </div>
            </div>

            {/* List of Photos */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-gray-300">
                  Current Gallery Images ({photos.length})
                </h4>
                <span className="text-[10px] uppercase font-mono text-gray-500">
                  Use arrows to reorder • Click text to edit
                </span>
              </div>

              {photos.length === 0 ? (
                <div className="p-12 text-center border border-white/10 rounded-2xl glass-panel">
                  <ImageIcon className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-400 font-serif-luxury">No photos added yet.</p>
                  <p className="text-xs text-gray-500 pt-1">Upload photos above to create your gallery.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between text-left space-y-3 group"
                    >
                      {/* Top image preview & Action controls */}
                      <div className="flex gap-3.5 items-start">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-white/15 relative">
                          <img
                            src={photo.image}
                            alt={photo.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                          />
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-white">
                            #{index + 1}
                          </span>
                        </div>

                        {/* Title & Caption */}
                        <div className="flex-1 min-w-0 space-y-1">
                          {editingId === photo.id ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                placeholder="Photo Title"
                                className="w-full px-2.5 py-1 text-xs bg-black/60 border border-white/20 rounded-md text-white font-sans-modern"
                              />
                              <textarea
                                value={tempCaption}
                                onChange={(e) => setTempCaption(e.target.value)}
                                placeholder="Short Caption"
                                rows={2}
                                className="w-full px-2.5 py-1 text-xs bg-black/60 border border-white/20 rounded-md text-white font-serif-luxury"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveEditing(photo.id)}
                                  className="px-3 py-1 bg-white text-black text-[10px] font-semibold uppercase tracking-wider rounded cursor-pointer"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-3 py-1 bg-white/10 text-white text-[10px] uppercase tracking-wider rounded cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => startEditing(photo)}
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                              title="Click to edit caption"
                            >
                              <h5 className="font-serif-luxury text-sm sm:text-base font-semibold text-white truncate">
                                {photo.title}
                              </h5>
                              <p className="font-handwriting text-base text-gray-300 line-clamp-2">
                                “{photo.caption}”
                              </p>
                              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono block pt-1">
                                ✎ Click to edit text
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom controls: Move up, Move down, Delete */}
                      <div className="flex justify-between items-center pt-2 border-t border-white/5 text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleMove(index, 'up')}
                            disabled={index === 0}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            title="Move Earlier / Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMove(index, 'down')}
                            disabled={index === photos.length - 1}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            title="Move Later / Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] uppercase tracking-wider font-mono text-gray-400 pl-1">
                            Order: {index + 1}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDelete(photo.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                          title="Delete this photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/70 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-sans-modern text-gray-400">
          <span>
            Photos and slots are saved permanently on the server. Refreshing will not lose changes.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-widest font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Subcomponent for individual Slot Card
interface SlotCardProps {
  key?: string;
  slot: PhotoSlot;
  isSaving: boolean;
  onReplaceImage: () => void;
  onSaveDetails: (title: string, caption: string, date: string) => void;
}

function SlotCard({ slot, isSaving, onReplaceImage, onSaveDetails }: SlotCardProps) {
  const [title, setTitle] = useState(slot.title || '');
  const [caption, setCaption] = useState(slot.caption || '');
  const [date, setDate] = useState(slot.date || 'Chapter 18');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setTitle(slot.title || '');
    setCaption(slot.caption || '');
    setDate(slot.date || 'Chapter 18');
    setIsDirty(false);
  }, [slot]);

  const handleSave = () => {
    onSaveDetails(title, caption, date);
    setIsDirty(false);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/15 bg-white/[0.02] flex flex-col justify-between text-left space-y-4 hover:border-white/30 transition-all">
      {/* Top Slot Header */}
      <div className="flex justify-between items-start gap-2">
        <div>
          <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-[9px] uppercase font-mono tracking-widest text-gray-300">
            SLOT #{slot.slotNumber} • {slot.name}
          </span>
          <p className="text-[11px] font-sans-modern text-gray-400 pt-1 font-light">
            Section: <span className="text-gray-200">{slot.section}</span>
          </p>
        </div>
      </div>

      {/* Image Thumbnail & Replace Action */}
      <div className="flex gap-4 items-center">
        <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-black shrink-0 border border-white/20 shadow-md group">
          <img
            src={slot.image}
            alt={slot.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
          />
          <button
            onClick={onReplaceImage}
            disabled={isSaving}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-[10px] uppercase font-sans-modern tracking-wider text-white transition-opacity cursor-pointer disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            <span>Change</span>
          </button>
        </div>

        <div className="flex-1 space-y-2">
          <button
            onClick={onReplaceImage}
            disabled={isSaving}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-sans-modern text-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-gray-300" />
            <span>Upload New Photo</span>
          </button>
          <p className="text-[10px] text-gray-500 font-sans-modern">
            Saved globally on the server. All visitors will see the new photo.
          </p>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div>
          <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5 font-mono">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsDirty(true);
            }}
            className="w-full px-2.5 py-1 text-xs bg-black/50 border border-white/15 rounded-md text-white font-sans-modern focus:outline-none focus:border-white/40"
          />
        </div>

        <div>
          <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5 font-mono">
            Caption / Note
          </label>
          <textarea
            value={caption}
            rows={2}
            onChange={(e) => {
              setCaption(e.target.value);
              setIsDirty(true);
            }}
            className="w-full px-2.5 py-1 text-xs bg-black/50 border border-white/15 rounded-md text-white font-serif-luxury focus:outline-none focus:border-white/40"
          />
        </div>

        <div>
          <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5 font-mono">
            Date / Label
          </label>
          <input
            type="text"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setIsDirty(true);
            }}
            className="w-full px-2.5 py-1 text-xs bg-black/50 border border-white/15 rounded-md text-gray-300 font-sans-modern focus:outline-none focus:border-white/40"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          className="px-4 py-1.5 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check className="w-3 h-3" />
              <span>Save Slot</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
