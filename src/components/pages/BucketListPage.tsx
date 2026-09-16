import React, { useState } from 'react';
import { INITIAL_BUCKET_LIST } from '../../data/magazineContent';
import { BucketListItem } from '../../types';
import { CheckSquare, Square, Plus, Sparkles } from 'lucide-react';
import { getStoredItem, setStoredItem } from '../../utils/storage';
import confetti from 'canvas-confetti';

export function BucketListPage() {
  const [items, setItems] = useState<BucketListItem[]>(() =>
    getStoredItem('bucket_list', INITIAL_BUCKET_LIST)
  );
  const [newItemText, setNewItemText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100) || 0;

  const toggleItem = (id: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) {
          confetti({
            particleCount: 25,
            spread: 45,
            origin: { y: 0.8 },
            colors: ['#ffffff', '#888899', '#33333e'],
          });
        }
        return { ...item, completed: nextState };
      }
      return item;
    });
    setItems(updated);
    setStoredItem('bucket_list', updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem: BucketListItem = {
      id: `custom_${Date.now()}`,
      text: newItemText.trim(),
      completed: false,
      isCustom: true,
    };
    const updated = [...items, newItem];
    setItems(updated);
    setStoredItem('bucket_list', updated);
    setNewItemText('');
    setIsAdding(false);
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <CheckSquare className="w-3.5 h-3.5 text-gray-300" />
          <span>GOALS & ADVENTURES • CHAPTER 18 MANIFESTO</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 18</span>
      </div>

      {/* Main Title & Progress */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 my-2">
        <div className="text-left space-y-1">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
            THE MANIFESTATION AGENDA
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase">
            HER BUCKET LIST
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
            Interactive mission objectives for Ramsha's 18th year around the sun.
          </p>
        </div>

        {/* Progress badge & add button */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono block">
              ADVENTURE PROGRESS
            </span>
            <span className="font-serif-luxury text-base font-bold text-white">
              {completedCount} / {items.length} ({progressPercent}%)
            </span>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer transition-all shadow-md"
            title="Add Bucket Item"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden my-4">
        <div
          className="bg-white h-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Add Custom Item Form */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="glass-panel p-4 rounded-xl border border-white/20 my-3 text-left space-y-2">
          <input
            type="text"
            placeholder="Add new dream or adventure..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
            required
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-white text-black text-xs font-sans-modern uppercase tracking-wider rounded-lg font-semibold cursor-pointer hover:bg-gray-200"
          >
            Add To List
          </button>
        </form>
      )}

      {/* Bucket List Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-xl border transition-all text-left flex items-start gap-3.5 group cursor-pointer ${
              item.completed
                ? 'bg-white/10 border-white/20'
                : 'glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <div className="mt-0.5 shrink-0 text-white group-hover:scale-110 transition-transform">
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-white" />
              ) : (
                <Square className="w-5 h-5 text-gray-500 group-hover:text-gray-300" />
              )}
            </div>

            <div className="flex-1">
              <span
                className={`font-serif-luxury text-sm sm:text-base tracking-wide transition-all ${
                  item.completed
                    ? 'line-through text-gray-400 font-normal'
                    : 'text-gray-100 font-medium group-hover:text-white'
                }`}
              >
                {item.text}
              </span>
            </div>

            {item.completed && (
              <span className="text-[9px] uppercase tracking-widest text-emerald-400/90 font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                ACHIEVED
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>CLICK TO CHECK / UNCHECK OBJECTIVES</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}
