import React, { useState } from 'react';
import { X, Upload, Check, Link as LinkIcon } from 'lucide-react';
import { readFileAsDataURL } from '../utils/storage';

interface ImageUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentImage: string;
  onSave: (newImageUrl: string) => void;
}

export function ImageUploaderModal({
  isOpen,
  onClose,
  title,
  currentImage,
  onSave,
}: ImageUploaderModalProps) {
  const [urlInput, setUrlInput] = useState(currentImage);
  const [preview, setPreview] = useState(currentImage);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessing(true);
      const base64 = await readFileAsDataURL(file);
      setPreview(base64);
      setUrlInput(base64);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    onSave(preview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel p-6 rounded-2xl border border-white/10 text-white shadow-2xl">
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5">
          <h3 className="font-serif-luxury text-xl tracking-wide font-semibold text-gray-100">
            {title || 'Personalize Photo'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current / New Preview */}
        <div className="relative w-full h-56 rounded-xl overflow-hidden border border-white/10 bg-black/60 mb-5 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-500 font-sans-modern">No image selected</span>
          )}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs text-gray-300">
              Processing image...
            </div>
          )}
        </div>

        {/* File upload trigger */}
        <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all cursor-pointer mb-4 text-xs uppercase tracking-widest text-gray-300 font-sans-modern">
          <Upload className="w-4 h-4 text-gray-400" />
          <span>Upload From Device (Phone / PC)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {/* URL Input option */}
        <div className="space-y-1 mb-6">
          <label className="text-[11px] uppercase tracking-wider text-gray-400 flex items-center gap-1.5 font-sans-modern">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Or Paste Image Link</span>
          </label>
          <input
            type="url"
            value={urlInput.startsWith('data:') ? '' : urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setPreview(e.target.value);
            }}
            placeholder="https://..."
            className="w-full px-3 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-gray-200 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs tracking-wider uppercase text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs tracking-wider uppercase bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
