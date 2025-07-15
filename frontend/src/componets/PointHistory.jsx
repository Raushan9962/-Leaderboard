// frontend/src/components/PointHistory.jsx
import React, { useState, useEffect } from 'react';
import { History, ChevronLeft, ChevronRight, Loader2, Info } from 'lucide-react'; // Added Info icon for empty state
import { pointsAPI } from '../services/api';

const PointHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 500));

      const response = await pointsAPI.getPointHistory(page, 10);
      setHistory(response.data.history);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message || 'Failed to fetch point history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchHistory(page);
    }
  };

  const formatDate = (dateString) => {
    // Ensure dateString is valid before formatting
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  // Loading State - CORRECTED JSX
  if (loading && currentPage === 1) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-border">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-text-primary">
          <History size={24} className="text-blue-600" /> Recent Activity
        </h2>
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
          <p className="text-gray-600 text-lg">Loading history...</p>
        </div>
      </div>
    );
  }

  // Error State - CORRECTED JSX
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-border">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 text-text-primary">
          <History size={24} className="text-blue-600" /> Recent Activity
        </h2>
        <div className="bg-red-100 text-red-700 p-4 rounded-md border border-red-200 text-center">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-border">
      <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 text-text-primary">
        <History size={24} className="text-blue-600" /> Recent Activity
      </h2>

      {history.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <Info size={48} className="mb-4" />
          <p className="text-lg">No point history found</p>
        </div>
      ) : (
        <>
          {/* History List */}
          <div className="space-y-4">
            {history.map((record, index) => (
              <div
                key={record._id || index} // Use _id if available, otherwise index as fallback
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:gap-4 flex-grow">
                  <p className="text-base md:text-lg font-semibold text-text-primary mr-2">
                    {record.userName} earned{' '}
                    <span className="text-blue-600 font-bold">
                      {record.pointsAwarded} points
                    </span>
                  </p>
                  <span className="text-xs md:text-sm text-gray-500">
                    {formatDate(record.timestamp)}
                  </span>
                </div>

                <div className="flex-shrink-0 text-green-600 font-bold text-lg md:text-xl ml-4">
                  +{record.pointsAwarded}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base md:text-lg font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <span className="text-gray-700 text-base md:text-lg font-medium px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base md:text-lg font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PointHistory;