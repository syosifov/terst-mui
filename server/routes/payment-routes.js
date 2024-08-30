const express = require('express');
const paymentController = require('../controllers/payment-controller');

const router = express.Router();

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.get('/stripe-config', paymentController.stripeConfig);

module.exports = router;