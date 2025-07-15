// frontend/src/components/AddUser.jsx
import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await onAddUser(name);
      setName('');
    } catch (err) {
      setError(err.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UserPlus size={24} className="text-blue-500" />
        Add New User
      </h2>
      
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            disabled={loading}
            maxLength={50}
          />
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-md border border-red-200 mt-3">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white w-full py-3 flex justify-center items-center gap-2 rounded-md font-semibold text-lg transition-colors duration-200 mt-4"
          disabled={loading || !name.trim()}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Adding...
            </>
          ) : (
            <>
              <UserPlus size={20} />
              Add User
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddUser;