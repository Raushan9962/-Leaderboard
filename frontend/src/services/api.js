import axios from 'axios';

// ✅ Corrected the variable name
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API methods
export const userAPI = {
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  createUser: async (name) => {
    try {
      const response = await api.post('/users', { name });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create user' };
    }
  },

  claimPoints: async (userId) => {
    try {
      const response = await api.post(`/users/${userId}/claim`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to claim points' };
    }
  }
};

export const pointsAPI = {
  getPointHistory: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/points/history?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch point history' };
    }
  },

  getUserPointHistory: async (userId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/points/history/${userId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user point history' };
    }
  }
};

export default api;
