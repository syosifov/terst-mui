const express = require('express');
const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.post('/add-products', adminController.postAddProducts);

module.exports = router;