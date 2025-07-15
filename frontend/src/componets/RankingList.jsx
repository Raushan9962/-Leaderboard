// frontend/src/components/RankingList.jsx
import React from 'react';
import { Medal, Trophy, Star, Crown } from 'lucide-react';

const RankingList = ({ users = [], startRank = 4 }) => {
  if (!users.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-gray-400 mb-2">
          <Trophy size={48} className="mx-auto" />
        </div>
        <p className="text-gray-500 text-lg">No users to display</p>
        <p className="text-gray-400 text-sm">Users will appear here once they join the leaderboard</p>
      </div>
    );
  }

  const getRankIcon = (rank) => {
    if (rank <= 3) {
      switch (rank) {
        case 1: return <Crown className="text-yellow-500" size={20} />;
        case 2: return <Medal className="text-gray-400" size={20} />;
        case 3: return <Medal className="text-amber-600" size={20} />;
        default: return null;
      }
    }
    return null;
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white',
        2: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
        3: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
      };
      return colors[rank] || 'bg-gray-100 text-gray-600';
    }
    return 'bg-gray-100 text-gray-600';
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index) => {
    const colors = [
      'bg-gradient-to-br from-purple-400 to-pink-400',
      'bg-gradient-to-br from-blue-400 to-indigo-400',
      'bg-gradient-to-br from-green-400 to-teal-400',
      'bg-gradient-to-br from-orange-400 to-red-400',
      'bg-gradient-to-br from-purple-500 to-blue-500',
      'bg-gradient-to-br from-pink-400 to-rose-400',
      'bg-gradient-to-br from-cyan-400 to-blue-400',
      'bg-gradient-to-br from-emerald-400 to-green-400',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b">
        <div className="flex items-center gap-2">
          <Trophy className="text-purple-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">
            Ranks {startRank} & Below
          </h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {users.length} {users.length === 1 ? 'user' : 'users'} in this category
        </p>
      </div>

      {/* User List */}
      <div className="divide-y divide-gray-100">
        {users.map((user, index) => {
          const currentRank = startRank + index;
          const isTopTier = currentRank <= 3;
          
          return (
            <div
              key={user._id || index}
              className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                isTopTier ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadge(currentRank)}`}>
                    {getRankIcon(currentRank) || `#${currentRank}`}
                  </div>

                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(index)}`}>
                    {getInitials(user.name)}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 font-medium text-lg">
                        {user.name}
                      </span>
                      {isTopTier && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                          Top {currentRank}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {user._id || `user${index + 1}`}
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="text-orange-500" size={16} />
                    <span className="text-lg font-bold text-gray-800">
                      {((user.totalPoints || user.points) ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    points
                  </div>
                </div>
              </div>

              {/* Progress Bar for Visual Appeal */}
              {users.length > 1 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isTopTier 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                          : 'bg-gradient-to-r from-purple-400 to-pink-400'
                      }`}
                      style={{
                        width: `${Math.max(10, ((user.totalPoints || user.points) || 0) / Math.max(...users.map(u => (u.totalPoints || u.points) || 0)) * 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3 text-center">
        <p className="text-xs text-gray-500">
          Keep climbing the ranks! 🚀
        </p>
      </div>
    </div>
  );
};

export default RankingList;