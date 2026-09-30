import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        <ChevronLeft className="w-4 h-4" /> Prev
      </button>

      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Page <strong className="text-gray-800 dark:text-white">{currentPage}</strong> of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
