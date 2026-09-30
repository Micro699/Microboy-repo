import React from 'react';
import { Menu, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onOpenSidebar }) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 text-white p-1.5 rounded-lg font-bold">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg leading-tight tracking-tight text-gray-900 dark:text-white">
              Microboy <span className="text-emerald-500">AI</span>
            </h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Predictions & Analytics</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
