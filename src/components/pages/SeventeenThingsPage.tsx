import React, { useState } from 'react';
import { EIGHTEEN_FACTS } from '../../data/magazineContent';
import { ListOrdered, Plus, Trash2, Sparkles } from 'lucide-react';
import { getStoredItem, setStoredItem } from '../../utils/storage';

export function SeventeenThingsPage() {
  const [facts, setFacts] = useState<string[]>(() =>
    getStoredItem('eighteen_facts', EIGHTEEN_FACTS)
  );
  const [newFact, setNewFact] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddFact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFact.trim()) return;
    const updated = [...facts, newFact.trim()];
    setFacts(updated);
    setStoredItem('eighteen_facts', updated);
    setNewFact('');
    setIsAdding(false);
  };

  const handleDeleteFact = (index: number) => {
    const updated = facts.filter((_, i) => i !== index);
    setFacts(updated);
    setStoredItem('eighteen_facts', updated);
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden border border-white/10 rounded-2xl sm:rounded-3xl glass-panel-card shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans-modern">
          <ListOrdered className="w-3.5 h-3.5 text-gray-300" />
          <span>OFFICIAL ANTHOLOGY • 18 DEFINING TRAITS</span>
        </div>
        <span className="font-serif-luxury text-sm italic text-gray-400">Chapter 13</span>
      </div>

      {/* Main Title Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 my-2">
        <div className="text-left space-y-1">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-sans-modern block">
            ANATOMY OF RAMSHA
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase">
            18 THINGS ABOUT RAMSHA
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-gray-300">
            A celebration of every quirk, cute habit, emotional truth, and chaotic moment.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-sans-modern uppercase tracking-widest text-white flex items-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAdding ? 'Cancel' : 'Add Fact'}</span>
        </button>
      </div>

      {/* Add Fact Form */}
      {isAdding && (
        <form onSubmit={handleAddFact} className="glass-panel p-4 rounded-xl border border-white/20 my-4 space-y-3 text-left">
          <input
            type="text"
            placeholder="Add another fact about Ramsha..."
            value={newFact}
            onChange={(e) => setNewFact(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
            required
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-white text-black text-xs font-sans-modern uppercase tracking-wider rounded-lg font-semibold cursor-pointer hover:bg-gray-200"
          >
            Save Fact
          </button>
        </form>
      )}

      {/* 18 Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6 max-h-[55vh] overflow-y-auto pr-1">
        {facts.map((fact, idx) => (
          <div
            key={idx}
            className="glass-panel p-3.5 sm:p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-start gap-3.5 text-left group relative"
          >
            <span className="font-serif-luxury text-base font-bold text-gray-400 group-hover:text-white shrink-0 mt-0.5">
              {String(idx + 1).padStart(2, '0')}.
            </span>
            <div className="flex-1">
              <p className="font-sans-modern text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                {fact}
              </p>
            </div>
            {idx >= 18 && (
              <button
                onClick={() => handleDeleteFact(idx)}
                className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-sans-modern">
        <span>A TRIBUTE TO HER 18 MAGICAL YEARS</span>
        <span>THE RAMSHA EDITION</span>
      </div>
    </section>
  );
}

export { SeventeenThingsPage as EighteenThingsPage };
