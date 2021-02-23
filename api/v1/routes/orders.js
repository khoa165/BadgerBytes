// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// User controller.
const orderController = require('../controllers/order');

// @route     POST /order
// @desc      Submit order
// @access    Public
router.post(
    '/',
    auth,
    [
        // Data validations.
        check('is_delivery')
            .notEmpty()
            .withMessage('Please indicate in delivery param if delivery (true) or pickup (false).')
            .isBoolean()
            .withMessage('Please enter delivery as either true or false.'),
        check('items')
            .notEmpty()
            .withMessage('Must add items to submit an order.'),
        check('time_to_pickup')
            .notEmpty()
            .withMessage('Include time until pickup or delivery in minutes.')
            .isNumeric()
            .withMessage('Please enter a number of minutes until pickup or delivery.'),
    ],
    orderController.submit
);

// @route     GET /order
// @desc      Get all orders
// @access    Private
router.get('/', auth, orderController.collect);

module.exports = router;
