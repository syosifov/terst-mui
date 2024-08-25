const express = require('express');
const shopController = require('../controllers/shop-controller');
const paymentRoutes = require('./payment-routes');

const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/products-by-id', shopController.getProductsById);
router.use('/payment', paymentRoutes);

module.exports = router;