const express = require('express');
const shopController = require('../controllers/shop-controller');

const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/products-by-id', shopController.getProductsById);

module.exports = router;