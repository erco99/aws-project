const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const creditsController = require('../controllers/creditsController')

// Get all users
router.get('/', authentication, userController.users)

// Insert payment method
router.get('/paymentMethodInsert', creditsController.paymentMethodInsert)

module.exports = router;