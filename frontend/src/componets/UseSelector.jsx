import React from 'react';
import { Users } from 'lucide-react';

const UserSelector = ({ users, selectedUser, onUserSelect, loading }) => {
  const handleSelectChange = (e) => {
    const userId = e.target.value;
    const user = users.find(u => u._id === userId);
    onUserSelect(user);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Select User
          </h2>
        </div>
        
        <div className="space-y-2">
          <label 
            htmlFor="user-select" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose a user:
          </label>
          
          <select
            id="user-select"
            value={selectedUser?._id || ''}
            onChange={handleSelectChange}
            disabled={loading}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 
                     text-sm sm:text-base
                     border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     bg-white shadow-sm
                     transition-all duration-200
                     hover:border-gray-400"
          >
            <option value="">
              {loading ? 'Loading users...' : 'Choose a user...'}
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.totalPoints} points)
              </option>
            ))}
          </select>
        </div>
        
        {selectedUser && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Selected:</span> {selectedUser.name}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Total Points: {selectedUser.totalPoints}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelector;