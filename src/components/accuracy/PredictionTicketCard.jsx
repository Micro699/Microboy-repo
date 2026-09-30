import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PredictionTicketCard({ ticket }) {
  const isWon = ticket.status === 'WON';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700/60 shadow-sm mb-2.5 flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-800 dark:text-white">{ticket.match}</span>
          <span className="text-[10px] text-gray-400">({ticket.league})</span>
        </div>
        
        {/* Displays both AI Pick and Actual FT Score Outcome */}
        <div className="text-xs text-gray-600 dark:text-gray-300">
          <span>AI Pick: <strong className="text-emerald-500">{ticket.pick}</strong></span>
          <span className="mx-1.5 text-gray-300">|</span>
          <span>Outcome: <strong className="text-gray-800 dark:text-gray-200">{ticket.actualScore || 'FT 2-1'}</strong></span>
          <span className="ml-1 text-[11px] text-gray-400">@{ticket.odds}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {isWon ? (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
            <CheckCircle className="w-4 h-4" /> WON
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-lg">
            <XCircle className="w-4 h-4" /> LOST
          </div>
        )}
      </div>
    </div>
  );
}
