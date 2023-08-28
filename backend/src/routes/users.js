const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const notificationController = require('../controllers/notificationsController');
const authentication = require('../middlewares/authentication');

// Get all users
router.get('/', authentication, userController.users);

// Change avatar image
router.post('/changeAvatar', authentication, userController.changeAvatar);

// Get all played booking
router.get('/getAllPlayedBookings', authentication, bookingController.getAllPlayedBookings);

// Get all unread notifications
router.get('/getAllUnreadNotifications', authentication, notificationController.getUnreadNotifications);

// Set a notifiction to read
router.post('/setNotificationToRead', authentication, notificationController.setNotificationToRead);

module.exports = router;