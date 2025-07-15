// backend/src/models/PointHistory.js
const mongoose = require('mongoose');

const pointHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  pointsAwarded: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
pointHistorySchema.index({ timestamp: -1 });
pointHistorySchema.index({ userId: 1 });

module.exports = mongoose.model('PointHistory', pointHistorySchema);