import React from 'react';
import { X, Shield, Activity, BarChart2 } from 'lucide-react';

export default function StatModal({ selected, onClose }) {
  if (!selected) return null;
  const { match, prediction } = selected;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md max-h-[85vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto p-4 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
          <h2 className="font-bold text-sm text-gray-800 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-500" /> Match Analysis & Odds
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Teams Matchup Header */}
        <div className="text-center bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{match.venue}</p>
          <div className="flex items-center justify-around font-bold text-sm text-gray-800 dark:text-white">
            <span>{match.homeTeam.name}</span>
            <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded">VS</span>
            <span>{match.awayTeam.name}</span>
          </div>
        </div>

        {/* AI Pick & Confidence */}
        <div className="bg-emerald-500 text-white p-3.5 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold opacity-90">AI Predicted Selection</p>
            <p className="text-lg font-black">{prediction.summary.predictedWinner}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] opacity-90">Win Probability</p>
            <p className="text-xl font-black">{prediction.summary.confidence}</p>
          </div>
        </div>

        {/* Real World Estimated Odds */}
        <div>
          <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Estimated Market Odds</h3>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">1 (Home)</span>
              <strong className="text-gray-800 dark:text-white">{prediction.odds.homeWin}</strong>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">X (Draw)</span>
              <strong className="text-gray-800 dark:text-white">{prediction.odds.draw}</strong>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">2 (Away)</span>
              <strong className="text-gray-800 dark:text-white">{prediction.odds.awayWin}</strong>
            </div>
          </div>
        </div>

        {/* Over/Under Markets */}
        <div>
          <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Over/Under Probability Lines</h3>
          <div className="space-y-2">
            {prediction.markets.overUnder.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs p-2 bg-gray-50 dark:bg-slate-800/40 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-300">{item.line}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Over ({item.over}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
