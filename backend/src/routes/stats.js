const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authentication = require('../middlewares/authentication');

// Get bookings year distribution
router.get('/yearDistribution', authentication, bookingController.getYearDistribution);

module.exports = router;