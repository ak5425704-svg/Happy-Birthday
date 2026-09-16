import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Disc, Volume2, Upload, Music2, Sparkles, Settings2, CheckCircle2 } from 'lucide-react';
import { ambientSound } from '../../utils/ambientAudio';
import { loadMusicConfig, saveMusicConfig, photoEvents, MUSIC_UPDATED_EVENT } from '../../services/photoStorage';
import { MusicConfig } from '../../types';

interface TeriDeewaniPageProps {
  onOpenAdmin?: () => void;
}

export function TeriDeewaniPage({ onOpenAdmin }: TeriDeewaniPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicConfig, setMusicConfig] = useState<MusicConfig | null>(null);
  const [progress, setProgress] = useState(30);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Edit fields
  const [editTitle, setEditTitle] = useState('');
  const [editArtist, setEditArtist] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load global music config from server
  useEffect(() => {
    loadMusicConfig().then((cfg) => {
      setMusicConfig(cfg);
      setEditTitle(cfg.title);
      setEditArtist(cfg.artist);
      setEditSubtitle(cfg.subtitle);
    });

    const handleMusicUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<MusicConfig>;
      if (customEvent.detail) {
        setMusicConfig(customEvent.detail);
        setEditTitle(customEvent.detail.title);
        setEditArtist(customEvent.detail.artist);
        setEditSubtitle(customEvent.detail.subtitle);
      }
    };

    photoEvents.addEventListener(MUSIC_UPDATED_EVENT, handleMusicUpdate);
    return () => {
      photoEvents.removeEventListener(MUSIC_UPDATED_EVENT, handleMusicUpdate);
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (musicConfig?.audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
          console.error("Audio playback error:", e);
          // Fallback to ambient sound if audio file fails
          ambientSound.play();
          setIsPlaying(true);
        });
      }
    } else {
      // Ambient Web Audio synth mode
      if (isPlaying) {
        ambientSound.stop();
        setIsPlaying(false);
      } else {
        ambientSound.play();
        setIsPlaying(true);
      }
    }
  };

  // Upload new song to server permanently
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        try {
          const updated = await saveMusicConfig({
            audioDataUrl: base64Data,
            title: editTitle || file.name.replace(/\.[^/.]+$/, ''),
            artist: editArtist || 'Selected Artist',
          });
          setMusicConfig(updated);
          setIsUploading(false);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 4000);
          // Stop previous audio playback
          if (isPlaying) {
            if (audioRef.current) audioRef.current.pause();
            ambientSound.stop();
            setIsPlaying(false);
          }
        } catch (err) {
          console.error('Failed to upload song:', err);
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await saveMusicConfig({
        title: editTitle,
        artist: editArtist,
        subtitle: editSubtitle,
      });
      setMusicConfig(updated);
      setIsEditingInfo(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const displayTitle = musicConfig?.title || 'Teri Deewani';
  const displayArtist = musicConfig?.artist || 'Kailash Kher';
  const displaySubtitle = musicConfig?.subtitle || 'The Eternal Anthem • On Continuous Repeat';

  return (
    <section
      id="music"
      className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl scroll-mt-24"
    >
      {musicConfig?.audioUrl && (
        <audio
          ref={audioRef}
          src={musicConfig.audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      {/* Editorial Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <Music2 className="w-3.5 h-3.5 text-gray-300" />
          <span>SOUNDTRACK & EMOTION • GLOBAL AUDIO ARCHIVES</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 06</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Emotional Essay on Her Anthem */}
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400">
            <Sparkles className="w-3 h-3 text-gray-300" />
            Her Signature Sound
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase leading-tight">
            {displayTitle}. <br />
            <span className="silver-text-gradient font-serif-luxury italic font-normal text-2xl sm:text-3xl md:text-4xl">
              More than just music.
            </span>
          </h2>

          <div className="space-y-4 font-sans-modern text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            <p>
              Certain songs are not just arrangements of chords and frequencies. They become personal time capsules. They carry the exact scent of cold evening car rides, the echoes of loud, unfiltered singing, and the quiet comfort of moments where words fall short.
            </p>
            <p>
              Whenever <em>“{displayTitle}”</em> plays, the energy shifts into something pure, soulful, and deeply nostalgic. It echoes Ramsha’s unfiltered intensity — the way she loves wholeheartedly, feels deeply, and approaches life with open arms and fierce loyalty.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-1">
            <p className="text-xs text-gray-400 font-sans-modern">
              <span className="text-gray-200 font-semibold">Note from the Editor:</span> Whenever this track starts playing, prepare for high-volume singing and mandatory emotional car-window staring.
            </p>
          </div>
        </div>

        {/* Right Column: Luxury Vinyl & Modern Music Player */}
        <div className="lg:col-span-5 w-full flex flex-col items-center">
          <div className="w-full max-w-sm glass-panel p-6 sm:p-7 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden text-center">
            {/* Vinyl record animation */}
            <div className="relative mx-auto my-3 w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-white/20 bg-gradient-to-tr from-neutral-900 via-neutral-950 to-neutral-900 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <div
                className={`w-full h-full rounded-full flex items-center justify-center transition-transform ${
                  isPlaying ? 'animate-[spin_7s_linear_infinite]' : ''
                }`}
              >
                {/* Grooves */}
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-8 rounded-full border border-white/5" />
                <div className="absolute inset-12 rounded-full border border-white/5" />
                {/* Vinyl Label */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-black border border-white/20 flex flex-col items-center justify-center">
                  <Disc className="w-5 h-5 text-gray-300" />
                  <span className="text-[8px] font-sans-modern text-gray-400 uppercase tracking-widest mt-0.5">
                    CH. 18
                  </span>
                </div>
              </div>
            </div>

            {/* Song details */}
            <div className="mt-4 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-sans-modern block">
                RAMSHA’S ANTHEM
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wider">
                {displayTitle}
              </h3>
              <p className="text-xs font-serif-luxury italic text-gray-400">
                {displayArtist ? `${displayArtist} • ` : ''}{displaySubtitle}
              </p>
            </div>

            {/* Audio Waveform Bars (live reactive animation) */}
            <div className="flex items-center justify-center gap-1 my-4 h-8 px-4">
              {[40, 75, 90, 50, 65, 100, 45, 80, 60, 95, 30, 85, 70, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-white/80' : 'bg-white/20'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * Math.random() + 20))}%` : '20%',
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-4">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between px-2">
              <div className="text-[10px] text-gray-400 font-mono">
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </div>

              <button
                id="play-teri-deewani-button"
                onClick={togglePlay}
                className="w-13 h-13 rounded-full bg-white text-black hover:bg-gray-200 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                )}
              </button>

              <div className="flex items-center gap-1 text-gray-400">
                <Volume2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono">100%</span>
              </div>
            </div>

            {/* Global Admin Music Status & Controls */}
            <div className="mt-5 pt-3 border-t border-white/10 flex flex-col items-center gap-2">
              {uploadSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-sans-modern py-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved permanently! All visitors will hear this song.</span>
                </div>
              )}

              {isUploading ? (
                <span className="text-xs text-gray-300 font-sans-modern animate-pulse">
                  Uploading to server storage...
                </span>
              ) : isEditingInfo ? (
                <form onSubmit={handleSaveInfo} className="w-full space-y-2 text-left pt-2">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-sans-modern">
                      Song Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-black/80 border border-white/20 rounded-md text-xs text-white"
                      placeholder="e.g. Teri Deewani"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-sans-modern">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      value={editArtist}
                      onChange={(e) => setEditArtist(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-black/80 border border-white/20 rounded-md text-xs text-white"
                      placeholder="e.g. Kailash Kher"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-white text-black text-[11px] font-semibold rounded uppercase tracking-wider cursor-pointer"
                    >
                      Save Globally
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingInfo(false)}
                      className="px-3 py-1 bg-white/10 text-white text-[11px] rounded uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <label className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[10px] text-gray-300 hover:text-white flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-sans-modern transition-all">
                    <Upload className="w-3 h-3" />
                    <span>Upload Song</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => setIsEditingInfo(true)}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-sans-modern transition-all"
                  >
                    <Settings2 className="w-3 h-3" />
                    <span>Edit Song Info</span>
                  </button>

                  {onOpenAdmin && (
                    <button
                      onClick={onOpenAdmin}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-sans-modern transition-all"
                    >
                      <span>Admin Studio</span>
                    </button>
                  )}
                </div>
              )}

              <span className="text-[9px] text-gray-500 font-sans-modern">
                Global Server Storage • {musicConfig?.audioUrl ? 'Custom Audio Active' : 'Sufi Ambient Mode'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>THE RAMSHA SOUNDTRACK ARCHIVE</span>
        <span>REPEAT: FOREVER</span>
      </div>
    </section>
  );
}
