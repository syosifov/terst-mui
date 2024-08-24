const express = require('express');
const shopController = require('../controllers/shop-controller');
const cartController = require('../controllers/cart-controller');

const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/products-by-id', shopController.getProductsById);
router.post('/checkout', cartController.checkout);

module.exports = router;