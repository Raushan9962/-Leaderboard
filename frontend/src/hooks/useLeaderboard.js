// frontend/src/hooks/useLeaderboard.js
import { useState, useEffect, useCallback } from 'react';
import { userAPI } from '../services/api';

export const useLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claiming, setClaiming] = useState(false);

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.getAllUsers();
      console.log("Fetched Users:", response); // ✅ check structure in console
      setUsers(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Claim points for a user
  const claimPoints = useCallback(async (userId) => {
    if (!userId) {
      throw new Error('Please select a user first');
    }

    try {
      setClaiming(true);
      setError(null);
      
      const response = await userAPI.claimPoints(userId);
      
      // Refresh the leaderboard after claiming points
      await fetchUsers();
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to claim points');
      throw err;
    } finally {
      setClaiming(false);
    }
  }, [fetchUsers]);

  // Create a new user
  const createUser = useCallback(async (name) => {
    if (!name || name.trim() === '') {
      throw new Error('User name is required');
    }

    try {
      setError(null);
      const response = await userAPI.createUser(name.trim());
      
      // Refresh the leaderboard after creating user
      await fetchUsers();
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to create user');
      throw err;
    }
  }, [fetchUsers]);

  // Initial load
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Refresh leaderboard manually
  const refreshLeaderboard = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    claiming,
    claimPoints,
    createUser,
    refreshLeaderboard
  };
};