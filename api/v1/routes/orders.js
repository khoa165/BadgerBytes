// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// User controller.
const orderController = require('../controllers/order');

// @route     GET /order
// @desc      Get all orders
// @access    Private
router.get('/', auth, orderController.collect);

module.exports = router;
