import React, { useEffect, useState } from 'react';
import { Hash, Minus, Plus, RotateCcw, X } from 'lucide-react';

interface RowCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RowCounterModal: React.FC<RowCounterModalProps> = ({ isOpen, onClose }) => {
  const [currentRound, setCurrentRound] = useState<number>(() => {
    const saved = localStorage.getItem('crochet_row_counter_current');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [targetRounds, setTargetRounds] = useState<number>(() => {
    const saved = localStorage.getItem('crochet_row_counter_target');
    return saved ? parseInt(saved, 10) : 24;
  });

  const [projectName, setProjectName] = useState<string>(() => {
    return localStorage.getItem('crochet_row_counter_name') || 'My Current Project';
  });

  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('crochet_row_counter_notes') || '';
  });

  useEffect(() => {
    localStorage.setItem('crochet_row_counter_current', currentRound.toString());
    localStorage.setItem('crochet_row_counter_target', targetRounds.toString());
    localStorage.setItem('crochet_row_counter_name', projectName);
    localStorage.setItem('crochet_row_counter_notes', notes);
  }, [currentRound, targetRounds, projectName, notes]);

  if (!isOpen) return null;

  const handleIncrement = () => {
    setCurrentRound(c => c + 1);
  };

  const handleDecrement = () => {
    setCurrentRound(c => Math.max(0, c - 1));
  };

  const handleReset = () => {
    if (window.confirm('Reset row counter back to zero?')) {
      setCurrentRound(0);
    }
  };

  const progressPercent = targetRounds > 0 
    ? Math.min(100, Math.round((currentRound / targetRounds) * 100))
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF8F5] border border-stone-300 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Hash className="w-5 h-5 text-amber-800" />
          <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900 font-semibold">
            Active Maker Tool
          </span>
        </div>

        <h3 className="font-serif text-2xl font-medium text-stone-900 leading-tight">
          Row & Round Counter
        </h3>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Your counts are saved automatically in your browser.
        </p>

        {/* Project Name editable */}
        <div className="mt-5">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name..."
            className="w-full font-serif text-lg font-medium text-stone-900 border-b border-stone-300 pb-1 bg-transparent focus:outline-none focus:border-amber-700"
          />
        </div>

        {/* Big Counter Display */}
        <div className="my-6 p-6 bg-white border border-stone-200 rounded-2xl text-center shadow-xs">
          <div className="text-xs font-sans uppercase tracking-widest text-stone-400 mb-1">
            Current Row / Round
          </div>
          <div className="font-mono text-6xl sm:text-7xl font-bold text-stone-900 tabular-nums">
            {currentRound}
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-700 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-stone-500 font-sans mt-2">
            <span>Progress: {progressPercent}%</span>
            <div className="flex items-center gap-1 font-mono">
              <span>Goal:</span>
              <input
                type="number"
                min={1}
                max={999}
                value={targetRounds}
                onChange={(e) => setTargetRounds(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center border border-stone-300 rounded px-1 py-0.5 text-xs text-stone-800"
              />
              <span>rounds</span>
            </div>
          </div>
        </div>

        {/* Large Tactile Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDecrement}
            className="py-4 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-stone-800 font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-98"
          >
            <Minus className="w-5 h-5" />
            <span>Row -1</span>
          </button>

          <button
            onClick={handleIncrement}
            className="py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-98"
          >
            <Plus className="w-5 h-5" />
            <span>Row +1</span>
          </button>
        </div>

        {/* Quick Reset & Notes */}
        <div className="mt-4 pt-4 border-t border-stone-200 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-stone-700">Project Notes:</span>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to zero</span>
            </button>
          </div>

          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. On round 16, switch to Terracotta yarn and work BLO..."
            className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-amber-700 font-sans"
          />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close Counter
          </button>
        </div>

      </div>
    </div>
  );
};
