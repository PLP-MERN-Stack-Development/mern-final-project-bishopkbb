const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/update', protect, updateProfile);
router.put('/update-password', protect, updatePassword);

module.exports = router;
