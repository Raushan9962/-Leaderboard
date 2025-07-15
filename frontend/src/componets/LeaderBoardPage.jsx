// LeaderboardPage.jsx
import React, { useState } from 'react';
import { Trophy, Flame, Crown, Gift } from 'lucide-react';
import Top3Highlight from './Top3Highlight';
import RankingList from './RankingList';

const TABS = ['Party Ranking', 'Live Ranking', 'Hourly Ranking', 'Wealth Ranking'];
const SUB_TABS = {
  'Party Ranking': ['Weekly Contribution', 'Weekly Charm'],
  'Live Ranking': ['Contribution', 'Star Tasks'],
  'Hourly Ranking': ['Hourly Live List', 'Hourly Party List'],
  'Wealth Ranking': ['Daily', 'Monthly']
};

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('Party Ranking');
  const [activeSubTab, setActiveSubTab] = useState(SUB_TABS['Party Ranking'][0]);

  const top3 = [
    { name: 'PRITESH', points: 1614546, avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Rimjhim', points: 1134590, avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'KRISHU', points: 942034, avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  const rest = [
    { name: 'THAKUR RAN VIJAY', points: 558378, avatar: 'https://i.pravatar.cc/150?img=6' },
    { name: 'MuKKU🔥', points: 503042, avatar: 'https://i.pravatar.cc/150?img=7' },
    { name: 'W❤️D', points: 352250, avatar: 'https://i.pravatar.cc/150?img=8' },
    { name: 'Captain🤍', points: 346392, avatar: 'https://i.pravatar.cc/150?img=9' },
    { name: 'MR.-RAJPUT🌍', points: 343892, avatar: 'https://i.pravatar.cc/150?img=10' },
    { name: 'ISHU🖤🔒', points: 321932, avatar: 'https://i.pravatar.cc/150?img=11' },
  ];

  return (
    <div className="p-4 max-w-md mx-auto text-center font-sans">
      {/* Top Tab Navigation */}
      <div className="flex justify-between gap-2 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setActiveSubTab(SUB_TABS[tab][0]);
            }}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === tab ? 'bg-yellow-400 text-white font-bold' : 'bg-gray-100 text-gray-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub Tab Navigation */}
      <div className="mt-3 flex justify-center gap-3">
        {SUB_TABS[activeTab].map(sub => (
          <button
            key={sub}
            onClick={() => setActiveSubTab(sub)}
            className={`px-3 py-1 text-sm rounded-full ${activeSubTab === sub ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Top 3 Highlight */}
      <Top3Highlight users={top3} />

      {/* Full Ranking List */}
      <RankingList users={rest} startRank={4} />

      {/* Bottom Footer */}
      <div className="mt-6 text-xs text-gray-500">
        <p>999+ Devil — 0 pts</p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
