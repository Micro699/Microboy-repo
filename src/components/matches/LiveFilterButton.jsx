import React from 'react';
import { Radio } from 'lucide-react';

export default function LiveFilterButton({ isLiveOnly, onToggle, liveCount }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
        isLiveOnly
          ? 'bg-red-500 text-white pulse-glow ring-2 ring-red-400'
          : 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 hover:bg-red-200'
      }`}
    >
      <Radio className={`w-4 h-4 ${isLiveOnly ? 'animate-pulse' : ''}`} />
      <span>LIVE</span>
      <span className="bg-red-600 text-white px-1.5 py-0.5 rounded-full text-[10px]">
        {liveCount}
      </span>
    </button>
  );
}
