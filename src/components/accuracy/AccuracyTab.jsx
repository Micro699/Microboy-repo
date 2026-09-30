import React, { useState } from 'react';
import HighWinningOddsProgress from './HighWinningOddsProgress';
import PredictionTicketCard from './PredictionTicketCard';
import { CheckCircle2, Target, Percent, XCircle } from 'lucide-react';

export default function AccuracyTab() {
  const [filterMode, setFilterMode] = useState('ALL');

  const initialTickets = [
    { id: 1, match: 'Arsenal vs Chelsea', league: 'EPL', pick: 'Over 2.5 Goals', actualScore: 'FT 3-1', odds: '1.75', status: 'WON' },
    { id: 2, match: 'Real Madrid vs Sevilla', league: 'La Liga', pick: 'Home Win (1)', actualScore: 'FT 2-0', odds: '1.45', status: 'WON' },
    { id: 3, match: 'Bayern Munich vs Dortmund', league: 'Bundesliga', pick: '1X & Over 1.5', actualScore: 'FT 2-2', odds: '1.38', status: 'WON' },
    { id: 4, match: 'Inter Milan vs AC Milan', league: 'Serie A', pick: 'Under 2.5 Goals', actualScore: 'FT 2-1', odds: '1.90', status: 'LOST' },
    { id: 5, match: 'PSG vs Marseille', league: 'Ligue 1', pick: 'Over 1.5 Goals', actualScore: 'FT 2-0', odds: '1.30', status: 'WON' },
    { id: 6, match: 'Juventus vs Napoli', league: 'Serie A', pick: 'Away Win (2)', actualScore: 'FT 1-1', odds: '2.10', status: 'LOST' },
  ];

  const wonTickets = initialTickets.filter((t) => t.status === 'WON');
  const lostTickets = initialTickets.filter((t) => t.status === 'LOST');

  const displayedTickets = initialTickets.filter((t) => {
    if (filterMode === 'WON') return t.status === 'WON';
    if (filterMode === 'LOST') return t.status === 'LOST';
    return true;
  });

  const hitRate = ((wonTickets.length / initialTickets.length) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Interactive Accuracy Cards */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setFilterMode('ALL')}
          className={`p-3 rounded-xl text-center border transition ${
            filterMode === 'ALL'
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
          }`}
        >
          <Target className={`w-5 h-5 mx-auto mb-1 ${filterMode === 'ALL' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
          <p className={`text-[10px] font-semibold ${filterMode === 'ALL' ? 'text-white' : 'text-emerald-700 dark:text-emerald-300'}`}>AI Picks</p>
          <p className={`text-lg font-black ${filterMode === 'ALL' ? 'text-white' : 'text-emerald-900 dark:text-emerald-100'}`}>{initialTickets.length}</p>
        </button>

        <button
          onClick={() => setFilterMode('WON')}
          className={`p-3 rounded-xl text-center border transition ${
            filterMode === 'WON'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md'
              : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60'
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 mx-auto mb-1 ${filterMode === 'WON' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
          <p className={`text-[10px] font-semibold ${filterMode === 'WON' ? 'text-white' : 'text-blue-700 dark:text-blue-300'}`}>Won Tickets</p>
          <p className={`text-lg font-black ${filterMode === 'WON' ? 'text-white' : 'text-blue-900 dark:text-blue-100'}`}>{wonTickets.length}</p>
        </button>

        <button
          onClick={() => setFilterMode('LOST')}
          className={`p-3 rounded-xl text-center border transition ${
            filterMode === 'LOST'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60'
          }`}
        >
          <XCircle className={`w-5 h-5 mx-auto mb-1 ${filterMode === 'LOST' ? 'text-white' : 'text-rose-600 dark:text-rose-400'}`} />
          <p className={`text-[10px] font-semibold ${filterMode === 'LOST' ? 'text-white' : 'text-rose-700 dark:text-rose-300'}`}>Lost Tickets</p>
          <p className={`text-lg font-black ${filterMode === 'LOST' ? 'text-white' : 'text-rose-900 dark:text-rose-100'}`}>{lostTickets.length}</p>
        </button>
      </div>

      <HighWinningOddsProgress tickets={initialTickets} />

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-sm text-gray-800 dark:text-white">
            {filterMode === 'ALL' && 'All AI Predictions Results'}
            {filterMode === 'WON' && 'Won Tickets Query Results'}
            {filterMode === 'LOST' && 'Lost Tickets Query Results'}
          </h3>
          <span className="text-xs text-gray-500">Hit Rate: {hitRate}%</span>
        </div>

        {displayedTickets.map((t) => (
          <PredictionTicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </div>
  );
}
