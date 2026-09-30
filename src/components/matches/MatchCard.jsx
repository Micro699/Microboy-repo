import React from 'react';
import { generatePrediction } from '../../services/predictionEngine';
import { ChevronRight } from 'lucide-react';

export default function MatchCard({ match, onSelectMatch, activeTab }) {
  const isLive = match.status.state === 'in';
  const isFinished = match.status.state === 'post';
  const prediction = generatePrediction(match);

  // Fallback badge handler
  const handleBadgeError = (e, teamName, isHome) => {
    e.target.onerror = null;
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=${isHome ? '1e293b' : '0f172a'}&color=fff&bold=true`;
  };

  // Dynamically select prediction text based on the active sidebar menu tab
  const getDisplayPick = () => {
    if (activeTab === 'overunder') {
      return `${prediction.markets.overUnderPick} (${prediction.markets.overUnderConfidence})`;
    }
    if (activeTab === 'btts') {
      return `${prediction.markets.bttsPick} (${prediction.markets.bttsConfidence})`;
    }
    return `Pick: ${prediction.summary.predictedWinner}`;
  };

  return (
    <div 
      onClick={() => onSelectMatch(match, prediction)}
      className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/60 p-3.5 shadow-sm hover:shadow-md transition cursor-pointer mb-3"
    >
      {/* Header: Competition + Women Tag + Clock */}
      <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-gray-100 dark:border-slate-700/40">
        <div className="flex items-center gap-1.5 truncate max-w-[220px]">
          <span className="font-bold text-gray-700 dark:text-gray-200 truncate">
            {match.leagueName}
          </span>
          {match.isWomens && (
            <span className="bg-pink-100 text-pink-700 dark:bg-pink-950/80 dark:text-pink-300 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
              WOMEN
            </span>
          )}
        </div>

        {isLive ? (
          <span className="flex items-center gap-1 bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full animate-pulse">
            LIVE {match.status.clock}
          </span>
        ) : isFinished ? (
          <span className="text-gray-400 font-medium">FT</span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-7 items-center my-1 gap-2">
        {/* Home Team */}
        <div className="col-span-3 flex items-center gap-2">
          <img 
            src={match.homeTeam.logo} 
            alt={match.homeTeam.name} 
            onError={(e) => handleBadgeError(e, match.homeTeam.name, true)}
            className="w-6 h-6 object-contain rounded-full bg-slate-100 flex-shrink-0" 
          />
          <span className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">
            {match.homeTeam.name}
          </span>
        </div>

        {/* Score / VS */}
        <div className="col-span-1 text-center font-bold text-sm bg-gray-50 dark:bg-slate-900 py-1 rounded-md text-gray-700 dark:text-gray-200">
          {isLive || isFinished ? `${match.homeTeam.score} - ${match.awayTeam.score}` : 'VS'}
        </div>

        {/* Away Team */}
        <div className="col-span-3 flex items-center justify-end gap-2 text-right">
          <span className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">
            {match.awayTeam.name}
          </span>
          <img 
            src={match.awayTeam.logo} 
            alt={match.awayTeam.name} 
            onError={(e) => handleBadgeError(e, match.awayTeam.name, false)}
            className="w-6 h-6 object-contain rounded-full bg-slate-100 flex-shrink-0" 
          />
        </div>
      </div>

      {/* Dynamic Pick Tag Footer */}
      <div className="mt-3 pt-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg p-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
            {activeTab === 'overunder' ? 'GOALS' : activeTab === 'btts' ? 'BTTS' : 'AI PICK'}
          </span>
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{getDisplayPick()}</span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <span className="text-[11px]">{prediction.summary.confidence}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
