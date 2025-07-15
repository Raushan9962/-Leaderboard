import React from 'react';
import { Trophy, Loader2 } from 'lucide-react';

const ClaimButton = ({ selectedUser, onClaimPoints, loading }) => {
  const handleClick = async () => {
    if (!selectedUser) return;
    
    try {
      await onClaimPoints(selectedUser._id);
    } catch (error) {
      console.error('Error claiming points:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <div className="space-y-4">
        <button
          className={`
            w-full
            flex items-center justify-center gap-2 sm:gap-3
            px-4 py-3 sm:px-6 sm:py-4
            text-sm sm:text-base font-semibold
            text-white
            bg-gradient-to-r from-blue-600 to-blue-700
            hover:from-blue-700 hover:to-blue-800
            disabled:from-gray-400 disabled:to-gray-500
            disabled:cursor-not-allowed
            rounded-lg
            shadow-lg hover:shadow-xl
            transition-all duration-200
            transform hover:scale-105 active:scale-95
            disabled:transform-none disabled:hover:scale-100
            focus:outline-none focus:ring-4 focus:ring-blue-300
            ${!selectedUser || loading ? 'opacity-50' : 'opacity-100'}
          `}
          onClick={handleClick}
          disabled={!selectedUser || loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
              <span>Claiming...</span>
            </>
          ) : (
            <>
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Claim Points</span>
            </>
          )}
        </button>
        
        {selectedUser && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-sm sm:text-base font-medium text-green-800">
                Ready to Claim
              </h3>
            </div>
            
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-700">Selected User:</span>
                <span className="font-semibold text-gray-900">{selectedUser.name}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span className="text-gray-700">Current Points:</span>
                <span className="font-semibold text-blue-600">{selectedUser.totalPoints}</span>
              </div>
            </div>
          </div>
        )}
        
        {!selectedUser && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm sm:text-base text-yellow-800">
                Please select a user to claim points
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimButton;