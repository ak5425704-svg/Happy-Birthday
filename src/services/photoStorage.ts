import { MemoryPhoto, MusicConfig, PhotoSlot } from '../types';
import { DEFAULT_MEMORIES } from '../data/magazineContent';

// Event target to notify listeners when photos or music change
export const photoEvents = new EventTarget();
export const PHOTOS_UPDATED_EVENT = 'photos_updated';
export const MUSIC_UPDATED_EVENT = 'music_updated';
export const SLOTS_UPDATED_EVENT = 'slots_updated';

const DB_NAME = 'RamshaBirthdayPhotosDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get all photos from IndexedDB
async function getPhotosFromIndexedDB(): Promise<MemoryPhoto[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const results = (req.result || []) as MemoryPhoto[];
        results.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        resolve(results);
      };
      req.onerror = () => resolve([]);
    });
  } catch (e) {
    console.warn('IndexedDB read failed:', e);
    return [];
  }
}

// Save all photos to IndexedDB
async function savePhotosToIndexedDB(photos: MemoryPhoto[]): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
    photos.forEach((photo, idx) => {
      store.put({ ...photo, order: photo.order ?? idx });
    });
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (e) {
    console.warn('IndexedDB write failed:', e);
  }
}

// Helper: Convert File to base64 Data URL
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 1. LOAD ALL PHOTOS (Syncs Server + IndexedDB)
export async function loadPhotos(): Promise<MemoryPhoto[]> {
  // First load from local IndexedDB for instant UI render
  const localPhotos = await getPhotosFromIndexedDB();

  try {
    // Attempt fetch from server API
    const res = await fetch('/api/photos');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.photos) && data.photos.length > 0) {
        const serverPhotos: MemoryPhoto[] = data.photos;

        // If local has photos not on server, merge them
        const serverIds = new Set(serverPhotos.map((p) => p.id));
        const missingOnServer = localPhotos.filter((p) => !serverIds.has(p.id));

        if (missingOnServer.length > 0) {
          // Push missing local photos to server
          await fetch('/api/photos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photos: missingOnServer }),
          });
          const merged = [...serverPhotos, ...missingOnServer];
          merged.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          await savePhotosToIndexedDB(merged);
          return merged;
        }

        await savePhotosToIndexedDB(serverPhotos);
        return serverPhotos;
      }
    }
  } catch (err) {
    console.warn('Server fetch /api/photos failed, falling back to local storage:', err);
  }

  // If local has data, return it
  if (localPhotos.length > 0) {
    return localPhotos;
  }

  // Fallback to default memories and seed both
  const defaults = DEFAULT_MEMORIES.map((m, idx) => ({ ...m, order: idx }));
  await savePhotosToIndexedDB(defaults);

  try {
    await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photos: defaults }),
    });
  } catch {
    // ignore
  }

  return defaults;
}

// 2. UPLOAD MULTIPLE PHOTOS (Permanent)
export async function uploadMultiplePhotos(
  files: File[],
  defaultCaption = 'Unfiltered laughter frozen in time.',
  onProgress?: (progressPercent: number) => void
): Promise<MemoryPhoto[]> {
  const currentPhotos = await loadPhotos();
  const newPhotosToAdd: MemoryPhoto[] = [];

  const totalFiles = files.length;
  for (let i = 0; i < totalFiles; i++) {
    const file = files[i];
    const dataUrl = await fileToDataURL(file);
    const id = `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${i}`;

    const newPhoto: MemoryPhoto = {
      id,
      title: file.name.replace(/\.[^/.]+$/, '') || `Memory #${currentPhotos.length + i + 1}`,
      caption: defaultCaption,
      date: 'Chapter 18',
      type: 'polaroid',
      rotation: (Math.random() - 0.5) * 5,
      order: currentPhotos.length + i,
      uploadedAt: Date.now(),
      image: dataUrl,
    };
    newPhotosToAdd.push(newPhoto);

    if (onProgress) {
      onProgress(Math.round(((i + 1) / totalFiles) * 70));
    }
  }

  // Immediate save to IndexedDB so they are permanently cached
  const combined = [...currentPhotos, ...newPhotosToAdd];
  await savePhotosToIndexedDB(combined);

  // Send to server
  try {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photos: newPhotosToAdd }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.photos)) {
        await savePhotosToIndexedDB(data.photos);
        photoEvents.dispatchEvent(new CustomEvent(PHOTOS_UPDATED_EVENT, { detail: data.photos }));
        if (onProgress) onProgress(100);
        return data.photos;
      }
    }
  } catch (err) {
    console.warn('Server photo sync failed, stored in IndexedDB:', err);
  }

  photoEvents.dispatchEvent(new CustomEvent(PHOTOS_UPDATED_EVENT, { detail: combined }));
  if (onProgress) onProgress(100);
  return combined;
}

// 3. DELETE PHOTO
export async function deletePhoto(id: string): Promise<MemoryPhoto[]> {
  const currentPhotos = await loadPhotos();
  const updated = currentPhotos.filter((p) => p.id !== id);
  await savePhotosToIndexedDB(updated);

  try {
    await fetch(`/api/photos/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server delete failed:', err);
  }

  photoEvents.dispatchEvent(new CustomEvent(PHOTOS_UPDATED_EVENT, { detail: updated }));
  return updated;
}

// 4. REORDER PHOTOS
export async function reorderPhotos(photos: MemoryPhoto[]): Promise<MemoryPhoto[]> {
  const ordered = photos.map((p, idx) => ({ ...p, order: idx }));
  await savePhotosToIndexedDB(ordered);

  try {
    await fetch('/api/photos/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photos: ordered }),
    });
  } catch (err) {
    console.warn('Server reorder sync failed:', err);
  }

  photoEvents.dispatchEvent(new CustomEvent(PHOTOS_UPDATED_EVENT, { detail: ordered }));
  return ordered;
}

// 5. UPDATE PHOTO DETAILS (Caption, Title, Date)
export async function updatePhoto(
  id: string,
  updates: Partial<MemoryPhoto>
): Promise<MemoryPhoto[]> {
  const currentPhotos = await loadPhotos();
  const updated = currentPhotos.map((p) => (p.id === id ? { ...p, ...updates } : p));
  await savePhotosToIndexedDB(updated);

  try {
    await fetch(`/api/photos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  } catch (err) {
    console.warn('Server update sync failed:', err);
  }

  photoEvents.dispatchEvent(new CustomEvent(PHOTOS_UPDATED_EVENT, { detail: updated }));
  return updated;
}

// ================= GLOBAL MUSIC SERVICE =================
export const DEFAULT_MUSIC_CONFIG: MusicConfig = {
  audioUrl: '',
  title: 'Teri Deewani',
  artist: 'Kailash Kher',
  subtitle: 'The Eternal Anthem • On Continuous Repeat',
  description: 'Certain songs are not just arrangements of chords and frequencies. They become personal time capsules. Whenever this track plays, the energy shifts into something pure, soulful, and deeply nostalgic.',
  editorNote: 'Whenever this track starts playing, prepare for high-volume singing and mandatory emotional car-window staring.',
};

export async function loadMusicConfig(): Promise<MusicConfig> {
  try {
    const res = await fetch('/api/music');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.music) {
        return data.music;
      }
    }
  } catch (e) {
    console.warn('Failed to load global music config:', e);
  }
  return DEFAULT_MUSIC_CONFIG;
}

export async function saveMusicConfig(
  updates: Partial<MusicConfig> & { audioDataUrl?: string }
): Promise<MusicConfig> {
  const res = await fetch('/api/music', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (data.success && data.music) {
    photoEvents.dispatchEvent(new CustomEvent(MUSIC_UPDATED_EVENT, { detail: data.music }));
    return data.music;
  }
  throw new Error(data.error || 'Failed to update music');
}

// ================= REPLACEABLE PHOTO SLOTS SERVICE =================
export const DEFAULT_PHOTO_SLOTS: PhotoSlot[] = [
  {
    id: 'slot-1',
    slotNumber: 1,
    name: 'Cover Hero Portrait',
    section: 'Front Cover (Chapter 01)',
    title: 'Ramsha XVIII',
    caption: '18 years of being effortlessly herself.',
    date: 'Chapter 18',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'slot-2',
    slotNumber: 2,
    name: 'Cinematic Spotlight',
    section: 'Time Capsule (Chapter 18)',
    title: 'Core Archive',
    caption: 'Years from now, these little moments will become the memories we smile about.',
    date: 'Chapter 18',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'slot-3',
    slotNumber: 3,
    name: 'Memory Slot 1 — Signature Glance',
    section: 'The Memory Wall (Chapter 08)',
    title: 'The Signature Unbothered Glance',
    caption: '“I told you so.” (Even when she didn’t).',
    date: 'Summer 2025',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'slot-4',
    slotNumber: 4,
    name: 'Memory Slot 2 — Mid-Laughter Kand',
    section: 'The Memory Wall (Chapter 08)',
    title: 'Mid-Laughter Kand Incident',
    caption: 'Five minutes before everything went completely wrong.',
    date: 'Autumn 2025',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'slot-5',
    slotNumber: 5,
    name: 'Memory Slot 3 — Wanderlust',
    section: 'The Memory Wall (Chapter 08)',
    title: 'Wanderer in Her Natural Habitat',
    caption: 'Roaming the alleys with nowhere specific to be.',
    date: 'Winter 2025',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'slot-6',
    slotNumber: 6,
    name: 'Memory Slot 4 — Pizza & Chaos',
    section: 'The Memory Wall (Chapter 08)',
    title: 'The Silent Pizza Observation',
    caption: 'Evaluating whether this pizza deserves her praise.',
    date: 'Spring 2026',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
];

export async function loadPhotoSlots(): Promise<PhotoSlot[]> {
  try {
    const res = await fetch('/api/photos/slots');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.slots) && data.slots.length > 0) {
        return data.slots;
      }
    }
  } catch (e) {
    console.warn('Failed to fetch photo slots from server:', e);
  }
  return DEFAULT_PHOTO_SLOTS;
}

export async function replacePhotoSlot(
  id: string,
  slotData: Partial<PhotoSlot>
): Promise<PhotoSlot[]> {
  const res = await fetch(`/api/photos/slots/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slotData),
  });
  const data = await res.json();
  if (data.success && data.slots) {
    photoEvents.dispatchEvent(new CustomEvent(SLOTS_UPDATED_EVENT, { detail: data.slots }));
    return data.slots;
  }
  throw new Error(data.error || 'Failed to replace photo slot');
}

export async function batchSavePhotoSlots(slots: PhotoSlot[]): Promise<PhotoSlot[]> {
  const res = await fetch('/api/photos/slots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slots }),
  });
  const data = await res.json();
  if (data.success && data.slots) {
    photoEvents.dispatchEvent(new CustomEvent(SLOTS_UPDATED_EVENT, { detail: data.slots }));
    return data.slots;
  }
  throw new Error(data.error || 'Failed to batch save slots');
}
