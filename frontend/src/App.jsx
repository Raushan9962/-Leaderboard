import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import UserSelector from './componets/UseSelector';
import ClaimButton from './componets/ClaimButton';
import AddUser from './componets/AddUser';
import PointHistory from './componets/PointHistory';
import Top3Highlight from './componets/Top3Highlight';
import RankingList from './componets/RankingList';
import LeaderboardPage from './componets/LeaderBoardPage';

// Hooks
import { useLeaderboard } from './hooks/useLeaderboard';

// Icons
import { Trophy, Settings, RefreshCw, Crown, Medal, Star, Gift, ArrowLeft, Users, Clock } from 'lucide-react';

// Modern Leaderboard Component
const ModernLeaderboard = ({ users, loading, onBack }) => {
  const [activeTab, setActiveTab] = useState('hourly');
  
  const top3 = users.slice(0, 3);
  const restUsers = users.slice(3);

  const tabs = [
    { id: 'live', label: 'Live Ranking', icon: Users },
    { id: 'hourly', label: 'Hourly Ranking', icon: Clock },
    { id: 'family', label: 'Family Ranking', icon: Trophy },
    { id: 'weekly', label: 'Weekly', icon: Star }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Medal className="text-amber-600" size={20} />;
      default: return <span className="text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getPodiumHeight = (rank) => {
    switch (rank) {
      case 1: return 'h-32';
      case 2: return 'h-24';
      case 3: return 'h-20';
      default: return 'h-16';
    }
  };

  const getPodiumColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-t from-yellow-400 to-yellow-300';
      case 2: return 'bg-gradient-to-t from-gray-400 to-gray-300';
      case 3: return 'bg-gradient-to-t from-amber-600 to-amber-500';
      default: return 'bg-gray-300';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-pink-300/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-yellow-300/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-8 w-3 h-3 bg-purple-300/50 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-12 w-5 h-5 bg-pink-200/30 rounded-full animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 text-white">
        <ArrowLeft size={24} className="cursor-pointer" onClick={onBack} />
        <div className="flex space-x-2 md:space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs md:text-sm px-2 md:px-1 py-1 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-yellow-400 font-semibold'
                  : 'text-white/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-xs">?</span>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="relative z-10 flex space-x-4 px-4 mb-6 overflow-x-auto">
        <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
          Hourly Live List
        </button>
        <button className="bg-white/10 text-white/70 px-4 py-2 rounded-full text-sm whitespace-nowrap">
          Hourly Party List
        </button>
      </div>

      {/* Countdown Timer */}
      <div className="relative z-10 text-center mb-6">
        <div className="text-white/80 text-xs mb-2">Settlement time</div>
        <div className="text-white font-mono text-lg">00:45:30</div>
      </div>

      {/* Rewards Badge */}
      <div className="absolute top-32 right-4 z-20">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Gift size={12} />
          Rewards
        </div>
      </div>

      {/* Winner Crown */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center shadow-2xl">
            <Crown className="text-yellow-300" size={32} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Clock className="text-white" size={16} />
          </div>
        </div>
      </div>

      {/* Podium */}
      {top3.length >= 3 && (
        <div className="relative z-10 flex items-end justify-center mb-8 px-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center mr-4">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-white font-bold text-lg">
                {getInitials(top3[1]?.name || '')}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
            </div>
            <div className={`w-20 ${getPodiumHeight(2)} ${getPodiumColor(2)} rounded-t-lg flex items-end justify-center pb-2`}>
              <div className="text-white font-bold text-sm">2nd</div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center mx-4">
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-lg bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white font-bold text-xl">
                {getInitials(top3[0]?.name || '')}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="text-white" size={16} />
              </div>
            </div>
            <div className={`w-24 ${getPodiumHeight(1)} ${getPodiumColor(1)} rounded-t-lg flex items-end justify-center pb-2`}>
              <div className="text-white font-bold">1st</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center ml-4">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
                {getInitials(top3[2]?.name || '')}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
            </div>
            <div className={`w-20 ${getPodiumHeight(3)} ${getPodiumColor(3)} rounded-t-lg flex items-end justify-center pb-2`}>
              <div className="text-white font-bold text-sm">3rd</div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Stats */}
      {top3.length >= 3 && (
        <div className="relative z-10 flex justify-center mb-8 px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center">
              {top3.map((user, index) => (
                <div key={user._id || user.id} className="flex flex-col items-center">
                  <div className="text-xs text-gray-600 mb-1 text-center truncate w-16">
                    {user.name.length > 8 ? user.name.substring(0, 8) + '...' : user.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="text-orange-500" size={16} />
                    <span className="font-bold text-lg">{user.totalPoints || user.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rest of Rankings */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-t-3xl min-h-[400px] px-4 py-6">
        <div className="space-y-3">
          {restUsers.map((user, index) => (
            <div key={user._id || user.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {getRankIcon(user.rank || (index + 4))}
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                  {getInitials(user.name)}
                </div>
                <div>
                  <div className="font-medium text-gray-800 truncate max-w-[150px]">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500">ID: {user._id || user.id}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-orange-500" size={16} />
                <span className="font-bold text-lg">{user.totalPoints || user.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMobileLeaderboard, setShowMobileLeaderboard] = useState(false);
  const {
    users,
    loading,
    error,
    claiming,
    claimPoints,
    createUser,
    refreshLeaderboard,
  } = useLeaderboard();

  const handleClaimPoints = async (userId) => {
    try {
      const response = await claimPoints(userId);
      toast.success(response.message || 'Points claimed successfully!');
      const updatedUser = users.find((u) => u._id === userId);
      if (updatedUser) setSelectedUser(updatedUser);
    } catch (error) {
      toast.error(error.message || 'Failed to claim points');
    }
  };

  const handleCreateUser = async (name) => {
    try {
      const response = await createUser(name);
      toast.success(response.message || 'User created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      refreshLeaderboard();
    } catch (error) {
      toast.error(error.message || 'Failed to create user', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleRefresh = () => {
    refreshLeaderboard();
    toast.info('Leaderboard refreshed!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Split top 3 and rest
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  // Add ranks to users for the mobile leaderboard
  const rankedUsers = sortedUsers.map((user, index) => ({
    ...user,
    rank: index + 1
  }));

  // If mobile leaderboard is active, show the modern design
  if (showMobileLeaderboard) {
    return (
      <div className="min-h-screen">
        <ModernLeaderboard 
          users={rankedUsers} 
          loading={loading} 
          onBack={() => setShowMobileLeaderboard(false)}
        />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 font-sans px-4 py-8 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold flex justify-center items-center gap-3 mb-2">
          <Trophy size={36} className="text-yellow-500" /> Leaderboard Challenge
        </h1>
        <p className="text-base md:text-lg text-gray-500">
          Select a user, claim points, and rise in ranks!
        </p>
      </header>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-6 border border-red-200">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Controls */}
      <section className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 mb-10">
        <div className="col-span-full md:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <UserSelector
            users={users}
            selectedUser={selectedUser}
            onUserSelect={setSelectedUser}
            loading={loading}
          />
          <ClaimButton
            selectedUser={selectedUser}
            onClaimPoints={handleClaimPoints}
            loading={claiming}
          />
        </div>

        <button
  className="col-span-full md:col-span-1 bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center gap-2 transition duration-200"
  onClick={handleRefresh}
  disabled={loading}
>
  <h2 className="text-xl font-semibold text-white">Refresh Board</h2>
  <div className="flex items-center gap-2">
    <RefreshCw size={20} />
    <span className="text-lg font-semibold">Refresh Leaderboard</span>
  </div>
</button>


        <div className="col-span-full md:col-span-2 lg:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <AddUser onAddUser={handleCreateUser} />
        </div>
      </section>

      {/* Mobile Leaderboard Toggle */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={24} />
            Modern Mobile Leaderboard
          </h2>
          <p className="text-gray-600 mb-4">
            Experience the modern mobile leaderboard with podium design, animated elements, and enhanced visuals.
          </p>
          <button
            onClick={() => setShowMobileLeaderboard(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
          >
            <Trophy size={20} />
            View Modern Leaderboard
          </button>
        </div>
      </section>

      {/* Leaderboard Sections */}
      <section className="space-y-8 mb-10">
        <Top3Highlight users={top3} />
        <RankingList users={rest} startRank={4} />
      </section>

      {/* Extras */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Additional Sections</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PointHistory />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <LeaderboardPage />
        </div>
      </section>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;