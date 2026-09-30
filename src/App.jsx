import React, { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import DateFilterTabs from './components/layout/DateFilterTabs';
import LiveFilterButton from './components/matches/LiveFilterButton';
import MatchCard from './components/matches/MatchCard';
import Pagination from './components/matches/Pagination';
import AccuracyTab from './components/accuracy/AccuracyTab';
import StatModal from './components/stats/StatModal';

import { fetchFixturesByDate } from './services/espnApi';
import { generatePrediction } from './services/predictionEngine';
import { getTodayDate } from './utils/helpers';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'hot', 'predictions', 'overunder', 'btts', 'odds', 'accuracy'
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [searchQuery, setSearchQuery] = useState('');
  
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveOnly, setIsLiveOnly] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Selected Match for Analytics Modal
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Fetch fixtures on date change
  useEffect(() => {
    let isMounted = true;
    const loadFixtures = async () => {
      setLoading(true);
      const data = await fetchFixturesByDate(selectedDate);
      if (isMounted) {
        setFixtures(data);
        setLoading(false);
        setCurrentPage(1);
      }
    };

    loadFixtures();
    return () => { isMounted = false; };
  }, [selectedDate]);

  // Automated Scroll-To-Top effect whenever page changes or tab changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage, activeTab]);

  // Tab & Search Filtering Logic
  const getFilteredFixtures = () => {
    let list = fixtures.filter((m) => m.status.state !== 'post' && !m.status.completed);

    if (isLiveOnly) {
      list = list.filter((m) => m.status.state === 'in');
    }

    if (activeTab === 'hot') {
      list = list.filter((m) => {
        const pred = generatePrediction(m);
        return parseInt(pred.summary.confidence, 10) >= 60;
      });
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.homeTeam.name.toLowerCase().includes(query) ||
          m.awayTeam.name.toLowerCase().includes(query) ||
          m.leagueName.toLowerCase().includes(query)
      );
    }

    return list;
  };

  const currentFixtures = getFilteredFixtures();
  const liveCount = fixtures.filter((m) => m.status.state === 'in' && !m.status.completed).length;

  // Pagination Calculations
  const totalPages = Math.ceil(currentFixtures.length / itemsPerPage);
  const paginatedFixtures = currentFixtures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-3 py-2">
        {activeTab === 'accuracy' ? (
          <AccuracyTab />
        ) : (
          <>
            <DateFilterTabs
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {/* Header Indicator */}
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
              <span>
                {activeTab === 'home' && '🏠 Home Main Feed'}
                {activeTab === 'hot' && '🔥 HOT High Confidence Picks (≥60%)'}
                {activeTab === 'predictions' && '📊 AI Predictions Feed'}
                {activeTab === 'overunder' && '⚽ Over / Under Goals Predictions'}
                {activeTab === 'btts' && '⚡ BTTS (Both Teams To Score)'}
                {activeTab === 'odds' && '📈 Real World Market Odds'}
              </span>
              <span className="text-gray-400 font-normal">
                {currentFixtures.length} Matches Active
              </span>
            </div>

            {/* Live Filter Controls */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Live & Upcoming Fixtures
              </span>
              <LiveFilterButton
                isLiveOnly={isLiveOnly}
                onToggle={() => setIsLiveOnly(!isLiveOnly)}
                liveCount={liveCount}
              />
            </div>

            {/* Match Feed */}
            {loading ? (
              <div className="py-12 text-center text-xs text-gray-400 animate-pulse">
                Fetching live real-world football fixtures...
              </div>
            ) : paginatedFixtures.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                {searchQuery ? `No matches found matching "${searchQuery}"` : 'No active fixtures available.'}
              </div>
            ) : (
              <div>
                {paginatedFixtures.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    activeTab={activeTab}
                    onSelectMatch={(m, p) => setSelectedMatch({ match: m, prediction: p })}
                  />
                ))}

                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </main>

      <StatModal
        selected={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
}
