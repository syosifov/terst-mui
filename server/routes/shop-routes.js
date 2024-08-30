const express = require('express');
const shopController = require('../controllers/shop-controller');
const paymentRoutes = require('./payment-routes');
const qrcodeController = require('../controllers/qrcode-controller');

const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/products-by-id', shopController.getProductsById);
router.post('/bot/message', shopController.botMessage)
router.use('/payment', paymentRoutes);
router.get('/generate-qr', qrcodeController.generateQR);

module.exports = router;