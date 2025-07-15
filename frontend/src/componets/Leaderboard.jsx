import React from 'react';
import { Crown, Medal, Award, User, Trophy } from 'lucide-react';

const Leaderboard = ({ users = [], loading }) => {

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-amber-600" size={20} />;
      default:
        return <Trophy className="text-yellow-500" size={16} />;
    }
  };

  const formatPoints = (points) => {
    if (points >= 1000000) {
      return `${(points / 1000000).toFixed(1)}M`;
    } else if (points >= 1000) {
      return `${(points / 1000).toFixed(0)}K`;
    }
    return points.toLocaleString();
  };

  const getAvatarInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center p-8 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-white border-opacity-25 mb-4"></div>
            <p className="text-lg">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6">
            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
              <User size={48} className="mb-4" />
              <p className="text-lg">No users found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const topThree = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-white text-sm mb-2">Settlement time 2 days 01:45:27</div>
          <div className="flex justify-end mb-4">
            <div className="bg-yellow-400 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              🎁 Rewards
            </div>
          </div>
        </div>

        {/* Trophy Icon */}
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-yellow-400 rounded-full mb-4">
            <Trophy size={40} className="text-orange-600" />
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-yellow-400 rounded"></div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-t-3xl p-6 mb-0">
          <div className="flex items-end justify-center gap-4 mb-6">
            {/* Second Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl mb-2">
                  {topThree[1]?.avatar || '👤'}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm mb-1">{topThree[1]?.name}</div>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Trophy size={14} />
                  <span className="text-sm font-bold">{formatPoints(topThree[1]?.totalPoints)}</span>
                </div>
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center -mt-4">
              <div className="relative">
                <div className="w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center text-2xl mb-2 border-4 border-yellow-400">
                  {topThree[0]?.avatar || '👤'}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div className="absolute -top-1 -left-1">
                  <div className="w-6 h-6 text-yellow-500">⭐</div>
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm mb-1">{topThree[0]?.name}</div>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Trophy size={14} />
                  <span className="text-sm font-bold">{formatPoints(topThree[0]?.totalPoints)}</span>
                </div>
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl mb-2">
                  {topThree[2]?.avatar || '👤'}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-sm mb-1">{topThree[2]?.name}</div>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Trophy size={14} />
                  <span className="text-sm font-bold">{formatPoints(topThree[2]?.totalPoints)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining Users List */}
        <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-b-3xl p-4 space-y-3">
          {remainingUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
                <span className="font-bold text-lg text-gray-700">{user.rank}</span>
              </div>

              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3">
                {user.avatar || '👤'}
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {user.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">
                  {user.totalPoints.toLocaleString()}
                </span>
                <Trophy size={16} className="text-yellow-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Leaderboard;