// backend/src/routes/users.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { getAllUsers, createUser, claimPoints } = require('../controllers/userController');

const router = express.Router();

// Validation middleware
const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be between 1 and 50 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// GET /api/users - Get all users with rankings
router.get('/', getAllUsers);

// POST /api/users - Create a new user
router.post('/', validateUser, createUser);

// POST /api/users/:id/claim - Claim points for a user
router.post('/:id/claim', claimPoints);

module.exports = router;