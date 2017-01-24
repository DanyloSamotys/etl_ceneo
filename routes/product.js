// Dependencies.
var express = require('express');
var router = express.Router();

// Controllers.
var ProductController = require('./../app/Http/Controllers/ProductController');

// Middlewares.
var VerifyProductId = require('./../app/Http/Middlewares/VerifyProductId');
var isProductIdUnique = require('./../app/Http/Middlewares/isProductIdUnique');

// Display the specified resource..
router.get('/product/:id', VerifyProductId, ProductController.show);
router.delete('/product/:id', VerifyProductId, ProductController.destroy);

// ETL.
router.post('/product/actions/extract', isProductIdUnique, ProductController.extract);
router.post('/product/actions/transform', VerifyProductId, ProductController.transform);
router.post('/product/actions/load', VerifyProductId, ProductController.load);
router.post('/product/actions/etl', isProductIdUnique, ProductController.etl);

module.exports = router;
