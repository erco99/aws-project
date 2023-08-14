const express = require('express');
const router = express.Router();
const creditsController = require('../controllers/creditsController')

// Insert payment method
router.post('/paymentMethodInsert', creditsController.paymentMethodInsert)

// Deposit money
router.post('/depositWithdrawMoney', creditsController.depositWithdrawMoney)

// Get all transactions
router.post('/getTransactions', creditsController.getTransactions)

// Delete payment method
router.post('/deletePaymentMethod', creditsController.deletePaymentMethod)

// Send money
router.post('/sendMoney', creditsController.sendMoney)

module.exports = router;
