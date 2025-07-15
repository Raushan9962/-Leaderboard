import React from 'react';
import { Crown } from 'lucide-react';

const Top3Highlight = ({ users = [] }) => {
  return (
    <div className="flex justify-center items-end gap-4 py-6 bg-gradient-to-br from-orange-200 to-orange-50 rounded-lg shadow-md mt-4">
      {users.map((user, index) => (
        <div
          key={user.name || index}
          className={`flex flex-col items-center ${index === 0 ? 'scale-110' : 'scale-100'}`}
        >
          <div className="relative">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white shadow"
            />
            {index === 0 && (
              <span className="absolute -top-3 -right-3">
                <Crown className="w-6 h-6 text-yellow-500" />
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-800 truncate max-w-[100px]">
            {user.name}
          </p>
          <p className="text-xs font-bold text-yellow-600">
            🏆 {(user.points ?? 0).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Top3Highlight;
