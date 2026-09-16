import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Increase payload limit for multiple high-res photo uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Ensure data & upload directories exist
const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded photos statically
app.use("/uploads", express.static(uploadsDir));

const photosFilePath = path.join(dataDir, "photos.json");
const settingsFilePath = path.join(dataDir, "settings.json");
const musicFilePath = path.join(dataDir, "music.json");
const photoSlotsFilePath = path.join(dataDir, "photo_slots.json");

const DEFAULT_MUSIC = {
  audioUrl: "",
  title: "Teri Deewani",
  artist: "Kailash Kher",
  subtitle: "The Eternal Anthem • On Continuous Repeat",
  description: "Certain songs are not just arrangements of chords and frequencies. They become personal time capsules. Whenever this track plays, the energy shifts into something pure, soulful, and deeply nostalgic.",
  editorNote: "Whenever this track starts playing, prepare for high-volume singing and mandatory emotional car-window staring.",
  updatedAt: Date.now(),
};

const DEFAULT_PHOTO_SLOTS = [
  {
    id: "slot-1",
    slotNumber: 1,
    name: "Cover Hero Portrait",
    section: "Front Cover (Chapter 01)",
    title: "Ramsha XVIII",
    caption: "18 years of being effortlessly herself.",
    date: "Chapter 18",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "slot-2",
    slotNumber: 2,
    name: "Cinematic Spotlight",
    section: "Time Capsule (Chapter 18)",
    title: "Core Archive",
    caption: "Years from now, these little moments will become the memories we smile about.",
    date: "Chapter 18",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "slot-3",
    slotNumber: 3,
    name: "Memory Slot 1 — Signature Glance",
    section: "The Memory Wall (Chapter 08)",
    title: "The Signature Unbothered Glance",
    caption: "“I told you so.” (Even when she didn’t).",
    date: "Summer 2025",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "slot-4",
    slotNumber: 4,
    name: "Memory Slot 2 — Mid-Laughter Kand",
    section: "The Memory Wall (Chapter 08)",
    title: "Mid-Laughter Kand Incident",
    caption: "Five minutes before everything went completely wrong.",
    date: "Autumn 2025",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "slot-5",
    slotNumber: 5,
    name: "Memory Slot 3 — Wanderlust",
    section: "The Memory Wall (Chapter 08)",
    title: "Wanderer in Her Natural Habitat",
    caption: "Roaming the alleys with nowhere specific to be.",
    date: "Winter 2025",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "slot-6",
    slotNumber: 6,
    name: "Memory Slot 4 — Pizza & Chaos",
    section: "The Memory Wall (Chapter 08)",
    title: "The Silent Pizza Observation",
    caption: "Evaluating whether this pizza deserves her praise.",
    date: "Spring 2026",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
];

const DEFAULT_MEMORIES = [
  {
    id: 'mem_1',
    title: 'The Signature Unbothered Glance',
    caption: '“I told you so.” (Even when she didn’t).',
    date: 'Summer 2025',
    type: 'polaroid',
    rotation: -2,
    order: 0,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mem_2',
    title: 'Mid-Laughter Kand Incident',
    caption: 'Five minutes before everything went completely wrong.',
    date: 'Autumn 2025',
    type: 'polaroid',
    rotation: 2.5,
    order: 1,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mem_3',
    title: 'Wanderer in Her Natural Habitat',
    caption: 'Roaming the alleys with nowhere specific to be.',
    date: 'Winter 2025',
    type: 'polaroid',
    rotation: -1.5,
    order: 2,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'mem_4',
    title: 'The Silent Pizza Observation',
    caption: 'Evaluating whether this pizza deserves her praise.',
    date: 'Spring 2026',
    type: 'polaroid',
    rotation: 3,
    order: 3,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
];

// Helper to load photos
function getSavedPhotos(): any[] {
  try {
    if (fs.existsSync(photosFilePath)) {
      const raw = fs.readFileSync(photosFilePath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading photos.json:", e);
  }
  return DEFAULT_MEMORIES;
}

// Helper to save photos
function savePhotos(photos: any[]) {
  try {
    fs.writeFileSync(photosFilePath, JSON.stringify(photos, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing photos.json:", e);
  }
}

// Helper to save base64 data url as file on disk if desired
function persistBase64Image(dataUrl: string, id: string): string {
  if (!dataUrl || !dataUrl.startsWith("data:image/")) {
    return dataUrl;
  }
  try {
    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches) return dataUrl;
    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const base64Data = matches[2];
    const filename = `photo_${id}_${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
    return `/uploads/${filename}`;
  } catch (e) {
    console.error("Error saving image file:", e);
    return dataUrl; // fallback to base64 if saving fails
  }
}

// Helper to get settings
function getSettings() {
  try {
    if (fs.existsSync(settingsFilePath)) {
      return JSON.parse(fs.readFileSync(settingsFilePath, "utf-8"));
    }
  } catch (e) {
    console.error("Error reading settings.json:", e);
  }
  return {};
}

function saveSettings(settings: any) {
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing settings.json:", e);
  }
}

// Helper to save base64 audio data as file on disk
function persistBase64Audio(dataUrl: string, id: string): string {
  if (!dataUrl || !dataUrl.startsWith("data:")) {
    return dataUrl;
  }
  try {
    const matches = dataUrl.match(/^data:(?:audio|video)\/([a-zA-Z0-9_-]+);base64,(.+)$/);
    if (!matches) {
      const parts = dataUrl.split(",");
      if (parts.length === 2) {
        const filename = `audio_${id}_${Date.now()}.mp3`;
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, Buffer.from(parts[1], "base64"));
        return `/uploads/${filename}`;
      }
      return dataUrl;
    }
    let ext = matches[1].toLowerCase();
    if (ext.includes("mpeg") || ext.includes("mp3")) ext = "mp3";
    else if (ext.includes("wav")) ext = "wav";
    else if (ext.includes("ogg")) ext = "ogg";
    else if (ext.includes("m4a") || ext.includes("mp4")) ext = "m4a";
    else ext = "mp3";

    const base64Data = matches[2];
    const filename = `audio_${id}_${Date.now()}.${ext}`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
    return `/uploads/${filename}`;
  } catch (e) {
    console.error("Error saving audio file:", e);
    return dataUrl;
  }
}

function getMusicConfig() {
  try {
    if (fs.existsSync(musicFilePath)) {
      const data = JSON.parse(fs.readFileSync(musicFilePath, "utf-8"));
      return { ...DEFAULT_MUSIC, ...data };
    }
  } catch (e) {
    console.error("Error reading music.json:", e);
  }
  return DEFAULT_MUSIC;
}

function saveMusicConfig(music: any) {
  try {
    fs.writeFileSync(musicFilePath, JSON.stringify(music, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing music.json:", e);
  }
}

function getPhotoSlots(): any[] {
  try {
    if (fs.existsSync(photoSlotsFilePath)) {
      const parsed = JSON.parse(fs.readFileSync(photoSlotsFilePath, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading photo_slots.json:", e);
  }
  return DEFAULT_PHOTO_SLOTS;
}

function savePhotoSlots(slots: any[]) {
  try {
    fs.writeFileSync(photoSlotsFilePath, JSON.stringify(slots, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing photo_slots.json:", e);
  }
}

// ================= API ENDPOINTS =================

// 1. GET ALL PHOTOS
app.get("/api/photos", (req, res) => {
  const photos = getSavedPhotos();
  res.json({ success: true, photos });
});

// 2. UPLOAD PHOTOS (Supports Multiple at once)
app.post("/api/photos", (req, res) => {
  try {
    const existing = getSavedPhotos();
    const newPhotos = Array.isArray(req.body.photos)
      ? req.body.photos
      : req.body.photo
      ? [req.body.photo]
      : [];

    if (newPhotos.length === 0) {
      return res.status(400).json({ success: false, message: "No photos provided" });
    }

    const processed = newPhotos.map((p: any, idx: number) => {
      const id = p.id || `photo_${Date.now()}_${idx}`;
      const imagePath = persistBase64Image(p.image, id);
      return {
        id,
        title: p.title || `Memory #${existing.length + idx + 1}`,
        caption: p.caption || "Unfiltered laughter frozen in time.",
        date: p.date || "Chapter 18",
        type: p.type || "polaroid",
        rotation: p.rotation !== undefined ? p.rotation : (Math.random() - 0.5) * 6,
        order: existing.length + idx,
        uploadedAt: Date.now(),
        image: imagePath,
      };
    });

    const merged = [...existing, ...processed];
    savePhotos(merged);

    res.json({ success: true, photos: merged, added: processed });
  } catch (err: any) {
    console.error("Error adding photos:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. REORDER PHOTOS
app.put("/api/photos/reorder", (req, res) => {
  try {
    const { photos } = req.body;
    if (!Array.isArray(photos)) {
      return res.status(400).json({ success: false, message: "Invalid photos array" });
    }
    const updated = photos.map((p, index) => ({ ...p, order: index }));
    savePhotos(updated);
    res.json({ success: true, photos: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. UPDATE SINGLE PHOTO (Caption, Title, Date)
app.put("/api/photos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, caption, date, rotation, image } = req.body;
    const photos = getSavedPhotos();
    let updatedPhoto = null;

    const updated = photos.map((p) => {
      if (p.id === id) {
        let finalImg = p.image;
        if (image && image !== p.image) {
          finalImg = persistBase64Image(image, id);
        }
        updatedPhoto = {
          ...p,
          title: title !== undefined ? title : p.title,
          caption: caption !== undefined ? caption : p.caption,
          date: date !== undefined ? date : p.date,
          rotation: rotation !== undefined ? rotation : p.rotation,
          image: finalImg,
        };
        return updatedPhoto;
      }
      return p;
    });

    if (!updatedPhoto) {
      return res.status(404).json({ success: false, message: "Photo not found" });
    }

    savePhotos(updated);
    res.json({ success: true, photos: updated, photo: updatedPhoto });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. DELETE PHOTO
app.delete("/api/photos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const photos = getSavedPhotos();
    const target = photos.find((p) => p.id === id);

    if (target && target.image && target.image.startsWith("/uploads/")) {
      const filename = path.basename(target.image);
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error("Error removing uploaded file:", e);
        }
      }
    }

    const filtered = photos.filter((p) => p.id !== id);
    savePhotos(filtered);
    res.json({ success: true, photos: filtered });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. APP SETTINGS (Cover photo, spotlight photo & caption)
app.get("/api/settings", (req, res) => {
  res.json({ success: true, settings: getSettings() });
});

app.post("/api/settings", (req, res) => {
  try {
    const current = getSettings();
    const { coverPhoto, spotlightPhoto, spotlightCaption } = req.body;

    let updatedCover = current.coverPhoto;
    if (coverPhoto) {
      updatedCover = persistBase64Image(coverPhoto, "cover");
    }

    let updatedSpotlight = current.spotlightPhoto;
    if (spotlightPhoto) {
      updatedSpotlight = persistBase64Image(spotlightPhoto, "spotlight");
    }

    const updated = {
      ...current,
      ...(updatedCover ? { coverPhoto: updatedCover } : {}),
      ...(updatedSpotlight ? { spotlightPhoto: updatedSpotlight } : {}),
      ...(spotlightCaption ? { spotlightCaption } : {}),
    };

    saveSettings(updated);
    res.json({ success: true, settings: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. GLOBAL MUSIC CONFIGURATION (Permanent Global Setting)
app.get("/api/music", (req, res) => {
  res.json({ success: true, music: getMusicConfig() });
});

app.post("/api/music", (req, res) => {
  try {
    const current = getMusicConfig();
    const { audioUrl, audioDataUrl, title, artist, subtitle, description, editorNote } = req.body;

    let finalAudioUrl = current.audioUrl;
    if (audioDataUrl) {
      finalAudioUrl = persistBase64Audio(audioDataUrl, "track");
    } else if (audioUrl !== undefined) {
      finalAudioUrl = audioUrl;
    }

    const updated = {
      ...current,
      audioUrl: finalAudioUrl,
      title: title !== undefined ? title : current.title,
      artist: artist !== undefined ? artist : current.artist,
      subtitle: subtitle !== undefined ? subtitle : current.subtitle,
      description: description !== undefined ? description : current.description,
      editorNote: editorNote !== undefined ? editorNote : current.editorNote,
      updatedAt: Date.now(),
    };

    saveMusicConfig(updated);
    res.json({ success: true, music: updated });
  } catch (err: any) {
    console.error("Error updating music config:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. REPLACEABLE PHOTO SLOTS (Curated & Globally Persistent)
app.get("/api/photos/slots", (req, res) => {
  res.json({ success: true, slots: getPhotoSlots() });
});

// Replace an individual slot by id (e.g. slot-1, slot-2, ...)
app.all(["/api/photos/slots/:id", "/api/photos/slots/replace/:id"], (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, caption, date } = req.body;
    const slots = getPhotoSlots();
    let updatedSlot: any = null;

    const updated = slots.map((s) => {
      if (s.id === id || String(s.slotNumber) === id) {
        let finalImg = s.image;
        if (image && image !== s.image) {
          finalImg = persistBase64Image(image, s.id);
        }
        updatedSlot = {
          ...s,
          title: title !== undefined ? title : s.title,
          caption: caption !== undefined ? caption : s.caption,
          date: date !== undefined ? date : s.date,
          image: finalImg,
          updatedAt: Date.now(),
        };
        return updatedSlot;
      }
      return s;
    });

    if (!updatedSlot) {
      return res.status(404).json({ success: false, message: "Slot not found" });
    }

    savePhotoSlots(updated);

    // Sync with settings if slot-1 or slot-2
    if (updatedSlot.id === "slot-1" || updatedSlot.slotNumber === 1) {
      const settings = getSettings();
      saveSettings({ ...settings, coverPhoto: updatedSlot.image });
    } else if (updatedSlot.id === "slot-2" || updatedSlot.slotNumber === 2) {
      const settings = getSettings();
      saveSettings({
        ...settings,
        spotlightPhoto: updatedSlot.image,
        spotlightCaption: updatedSlot.caption,
      });
    } else if (["slot-3", "slot-4", "slot-5", "slot-6"].includes(updatedSlot.id)) {
      const memSlotMap: Record<string, string> = {
        "slot-3": "mem_1",
        "slot-4": "mem_2",
        "slot-5": "mem_3",
        "slot-6": "mem_4",
      };
      const memId = memSlotMap[updatedSlot.id];
      if (memId) {
        const photos = getSavedPhotos();
        const updatedPhotos = photos.map((p) => {
          if (p.id === memId) {
            return {
              ...p,
              image: updatedSlot.image,
              title: updatedSlot.title || p.title,
              caption: updatedSlot.caption || p.caption,
              date: updatedSlot.date || p.date,
            };
          }
          return p;
        });
        savePhotos(updatedPhotos);
      }
    }

    res.json({ success: true, slot: updatedSlot, slots: updated });
  } catch (err: any) {
    console.error("Error replacing photo slot:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Batch update photo slots
app.post("/api/photos/slots", (req, res) => {
  try {
    const { slots } = req.body;
    if (!Array.isArray(slots)) {
      return res.status(400).json({ success: false, message: "Invalid slots array" });
    }
    const currentSlots = getPhotoSlots();
    const updated = currentSlots.map((existing) => {
      const incoming = slots.find((s: any) => s.id === existing.id || s.slotNumber === existing.slotNumber);
      if (!incoming) return existing;

      let finalImg = incoming.image || existing.image;
      if (finalImg && finalImg.startsWith("data:image/")) {
        finalImg = persistBase64Image(finalImg, existing.id);
      }
      return {
        ...existing,
        ...incoming,
        image: finalImg,
        updatedAt: Date.now(),
      };
    });

    savePhotoSlots(updated);

    // Sync settings and memory photos
    const slot1 = updated.find((s) => s.id === "slot-1" || s.slotNumber === 1);
    const slot2 = updated.find((s) => s.id === "slot-2" || s.slotNumber === 2);
    if (slot1 || slot2) {
      const settings = getSettings();
      saveSettings({
        ...settings,
        ...(slot1?.image ? { coverPhoto: slot1.image } : {}),
        ...(slot2?.image ? { spotlightPhoto: slot2.image } : {}),
        ...(slot2?.caption ? { spotlightCaption: slot2.caption } : {}),
      });
    }

    const memSlotMap: Record<string, string> = {
      "slot-3": "mem_1",
      "slot-4": "mem_2",
      "slot-5": "mem_3",
      "slot-6": "mem_4",
    };
    const photos = getSavedPhotos();
    let hasPhotoChanges = false;
    const updatedPhotos = photos.map((p) => {
      const matchedSlot = updated.find((s) => memSlotMap[s.id] === p.id);
      if (matchedSlot) {
        hasPhotoChanges = true;
        return {
          ...p,
          image: matchedSlot.image || p.image,
          title: matchedSlot.title || p.title,
          caption: matchedSlot.caption || p.caption,
          date: matchedSlot.date || p.date,
        };
      }
      return p;
    });
    if (hasPhotoChanges) {
      savePhotos(updatedPhotos);
    }

    res.json({ success: true, slots: updated });
  } catch (err: any) {
    console.error("Error updating photo slots:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Vite middleware & Static serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
