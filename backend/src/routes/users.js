const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

// Get all users
router.get('/', authentication, userController.users);

// Change avatar image
router.post('/changeAvatar', authentication, userController.changeAvatar);

module.exports = router;