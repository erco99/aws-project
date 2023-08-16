const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

// Get bookings year distribution
router.get('/yearDistribution', authentication, bookingController.getYearDistribution);

// Get bookings field distribution
router.get('/fieldDistribution', authentication, bookingController.getFieldDistribution);

// Get user count
router.get('/usersDistribution', authentication, userController.getUsersDistribution);

module.exports = router;