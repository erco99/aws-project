const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const authentication = require('../middlewares/authentication');

// Get all users
router.get('/', authentication, userController.users);

// Change avatar image
router.post('/changeAvatar', authentication, userController.changeAvatar);

// Get all played booking
router.get('/getAllPlayedBookings', authentication, bookingController.getAllPlayedBookings);

module.exports = router;