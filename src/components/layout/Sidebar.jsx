import React from 'react';
import { X, Home, Flame, BarChart3, TrendingUp, Award, Goal, ShieldAlert } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, activeTab, setActiveTab }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'hot', label: 'HOT Football Pulse', icon: Flame },
    { id: 'predictions', label: 'AI Predictions Feed', icon: BarChart3 },
    { id: 'overunder', label: 'Over/Under Goals', icon: Goal },
    { id: 'btts', label: 'BTTS (Both Teams To Score)', icon: TrendingUp },
    { id: 'odds', label: 'Real World Market Odds', icon: TrendingUp },
    { id: 'accuracy', label: 'Accuracy Dashboard', icon: Award },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col p-4 z-10">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-800">
          <span className="font-bold text-gray-800 dark:text-white text-lg">Menu Navigation</span>
          <button onClick={onClose} className="p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4 flex-1 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/20'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-gray-200 dark:border-slate-800 text-xs text-gray-500 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>Calculated via AI Statistical Models. Bet responsibly.</span>
        </div>
      </div>
    </div>
  );
}
