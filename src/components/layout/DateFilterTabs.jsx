import React, { useState } from 'react';
import { Calendar, Search, X } from 'lucide-react';
import { getTodayDate, getTomorrowDate } from '../../utils/helpers';

export default function DateFilterTabs({ selectedDate, onSelectDate, searchQuery, setSearchQuery }) {
  const [showSearch, setShowSearch] = useState(false);
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();

  return (
    <div className="bg-white dark:bg-slate-800/80 p-2 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm my-3 space-y-2">
      <div className="flex items-center justify-between">
        {/* Date Quick Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectDate(today)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedDate === today
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => onSelectDate(tomorrow)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedDate === tomorrow
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            Tomorrow
          </button>
        </div>

        {/* Action Controls: Search Icon & Calendar Picker */}
        <div className="flex items-center gap-1 pl-2 border-l border-gray-200 dark:border-slate-700">
          {/* Search Toggle Button */}
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              if (showSearch) setSearchQuery(''); // Clear search on close
            }}
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition"
            aria-label="Search Matches"
          >
            {showSearch ? <X className="w-5 h-5 text-rose-500" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Calendar Picker Icon */}
          <div className="relative flex items-center">
            <label htmlFor="date-picker" className="cursor-pointer p-1.5 text-gray-600 dark:text-gray-300 hover:text-emerald-500">
              <Calendar className="w-5 h-5" />
            </label>
            <input
              id="date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => e.target.value && onSelectDate(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {showSearch && (
        <div className="pt-1">
          <input
            type="text"
            placeholder="Search teams or leagues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
