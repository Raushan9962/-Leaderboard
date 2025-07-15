// backend/src/routes/points.js
const express = require('express');
const { getPointHistory, getUserPointHistory } = require('../controllers/pointsController');

const router = express.Router();

// GET /api/points/history - Get all point history
router.get('/history', getPointHistory);

// GET /api/points/history/:userId - Get point history for specific user
router.get('/history/:userId', getUserPointHistory);

module.exports = router;