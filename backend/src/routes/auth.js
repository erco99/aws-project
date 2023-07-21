const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// Verify OPT route
router.post('/verifyOTP', authController.verifyOTP);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

// Refresh route
router.post('/refresh', authController.refresh);

module.exports = router;