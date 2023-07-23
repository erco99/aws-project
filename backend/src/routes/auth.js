const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authentication = require('../middlewares/authentication');

// Register route
router.post('/register', authController.register);

// Get new OTP
router.get('/newOTP', authentication, authController.newOTP);

// Verify OPT route
router.post('/verifyOTP', authController.verifyOTP);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

// Refresh route
router.post('/refresh', authController.refresh);

// User route
router.get('/user', authentication, authController.user);

module.exports = router;