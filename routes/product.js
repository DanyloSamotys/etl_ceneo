// Dependencies.
var express = require('express');
var router = express.Router();

// Controllers.
var ProductController = require('./../app/Http/Controllers/ProductController');

// Middlewares.
var VerifyProductId = require('./../app/Http/Middlewares/VerifyProductId');

// Display the specified resource..
router.get('/product/:id', ProductController.show);

// ETL.
router.post('/product/actions/extract', ProductController.extract);
router.post('/product/actions/transform', VerifyProductId, ProductController.transform);
router.post('/product/actions/load', VerifyProductId, ProductController.load);
router.post('/product/actions/etl', ProductController.etl);

module.exports = router;
