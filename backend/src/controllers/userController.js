// backend/src/controllers/userController.js
const User = require('../models/User');
const PointHistory = require('../models/PointHistory');

// Calculate and update ranks for all users
const updateRanks = async () => {
  const users = await User.find().sort({ totalPoints: -1 });
  
  for (let i = 0; i < users.length; i++) {
    users[i].rank = i + 1;
    await users[i].save();
  }
  
  return users;
};

// Get all users with rankings
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    
    // Update ranks if needed
    const updatedUsers = await updateRanks();
    
    res.json({
      success: true,
      data: updatedUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this name already exists'
      });
    }
    
    const user = new User({ name: name.trim() });
    await user.save();
    
    // Update ranks after adding new user
    await updateRanks();
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Claim points for a user
const claimPoints = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Generate random points between 1 and 10
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    
    // Update user's total points
    user.totalPoints += randomPoints;
    await user.save();
    
    // Create point history record
    const pointHistory = new PointHistory({
      userId: user._id,
      userName: user.name,
      pointsAwarded: randomPoints
    });
    await pointHistory.save();
    
    // Update ranks for all users
    await updateRanks();
    
    res.json({
      success: true,
      data: {
        user,
        pointsAwarded: randomPoints,
        newTotal: user.totalPoints
      },
      message: `${randomPoints} points awarded to ${user.name}!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error claiming points',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  claimPoints
};