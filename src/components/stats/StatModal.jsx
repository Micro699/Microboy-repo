import React from 'react';
import { X, Shield, Activity, BarChart2, Goal, TrendingUp } from 'lucide-react';

export default function StatModal({ selected, onClose }) {
  if (!selected) return null;
  const { match, prediction } = selected;

  if (!match || !prediction) return null;

  // Safe fallback badge error handler
  const handleBadgeError = (e, teamName, isHome) => {
    e.target.onerror = null;
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName || 'Team')}&background=${isHome ? '1e293b' : '0f172a'}&color=fff&bold=true`;
  };

  const overUnderLines = prediction?.markets?.overUnderLines || [
    { line: '0.5 Goals', over: 85, under: 15 },
    { line: '1.5 Goals', over: 70, under: 30 },
    { line: '2.5 Goals', over: 55, under: 45 },
    { line: '3.5 Goals', over: 30, under: 70 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto p-4 shadow-2xl space-y-4 border border-gray-100 dark:border-slate-800">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-500" />
            <h2 className="font-bold text-sm text-gray-800 dark:text-white">
              Match Analysis & H2H Brief
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Competition & Venue */}
        <div className="text-center bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/60">
          <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            {match?.leagueName || 'International Soccer'}
          </p>
          
          <div className="flex items-center justify-around font-bold text-sm text-gray-800 dark:text-white">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-1 w-2/5">
              <img
                src={match?.homeTeam?.logo}
                alt=""
                onError={(e) => handleBadgeError(e, match?.homeTeam?.name, true)}
                className="w-8 h-8 object-contain rounded-full bg-slate-100"
              />
              <span className="text-xs text-center truncate w-full">{match?.homeTeam?.name}</span>
            </div>

            {/* Score / VS */}
            <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-xs font-black">
              {match?.status?.state === 'in' || match?.status?.state === 'post'
                ? `${match?.homeTeam?.score} - ${match?.awayTeam?.score}`
                : 'VS'}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-1 w-2/5">
              <img
                src={match?.awayTeam?.logo}
                alt=""
                onError={(e) => handleBadgeError(e, match?.awayTeam?.name, false)}
                className="w-8 h-8 object-contain rounded-full bg-slate-100"
              />
              <span className="text-xs text-center truncate w-full">{match?.awayTeam?.name}</span>
            </div>
          </div>
        </div>

        {/* AI Pick & Confidence Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3.5 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold opacity-90">AI Predicted Selection</p>
            <p className="text-lg font-black">Pick: {prediction?.summary?.predictedWinner}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider font-semibold opacity-90">Win Confidence</p>
            <p className="text-xl font-black">{prediction?.summary?.confidence}</p>
          </div>
        </div>

        {/* Estimated Market 1X2 Odds */}
        <div>
          <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            Estimated 1X2 Market Odds
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">1 (Home)</span>
              <strong className="text-gray-800 dark:text-white">{prediction?.odds?.homeWin || '1.85'}</strong>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">X (Draw)</span>
              <strong className="text-gray-800 dark:text-white">{prediction?.odds?.draw || '3.40'}</strong>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400 block text-[10px]">2 (Away)</span>
              <strong className="text-gray-800 dark:text-white">{prediction?.odds?.awayWin || '4.10'}</strong>
            </div>
          </div>
        </div>

        {/* Over/Under Goal Lines */}
        <div>
          <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
            <Goal className="w-3.5 h-3.5 text-emerald-500" />
            Over / Under Goals Probabilities
          </h3>
          <div className="space-y-1.5">
            {overUnderLines.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs p-2 bg-gray-50 dark:bg-slate-800/40 rounded-lg">
                <span className="font-semibold text-gray-600 dark:text-gray-300">{item.line}</span>
                <div className="flex gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Over ({item.over}%)</span>
                  <span className="text-gray-400 font-medium">Under ({item.under}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BTTS Summary */}
        <div className="bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-xl flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-700 dark:text-gray-300">BTTS Market Prediction</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {prediction?.markets?.bttsPick || 'BTTS Yes'} ({prediction?.markets?.bttsConfidence || '65%'})
          </span>
        </div>

      </div>
    </div>
  );
}
