const express = require('express');
const router = express.Router();
const creditsController = require('../controllers/creditsController')

// Insert payment method
router.post('/paymentMethodInsert', creditsController.paymentMethodInsert)

// Deposit money
router.post('/depositWithdrawMoney', creditsController.depositWithdrawMoney)


module.exports = router;
