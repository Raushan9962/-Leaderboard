// backend/src/controllers/pointsController.js
const PointHistory = require('../models/PointHistory');

// Get point history with pagination
const getPointHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const history = await PointHistory.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name');
    
    const total = await PointHistory.countDocuments();
    
    res.json({
      success: true,
      data: {
        history,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching point history',
      error: error.message
    });
  }
};

// Get point history for a specific user
const getUserPointHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const history = await PointHistory.find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await PointHistory.countDocuments({ userId });
    
    res.json({
      success: true,
      data: {
        history,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user point history',
      error: error.message
    });
  }
};

module.exports = {
  getPointHistory,
  getUserPointHistory
};