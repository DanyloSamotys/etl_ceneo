// Dependencies.
var express = require('express');
var router = express.Router();

// Controllers.
var HomeController = require('../app/Http/Controllers/HomeController');

// Display a listing of the resource.
router.get('/', HomeController.index);

module.exports = router;
