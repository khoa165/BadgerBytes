// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// User controller.
const orderController = require('../controllers/order');

// @route     POST /orders/items
// @desc      Add item to order
// @access    Public
router.post(
  '/items',
  auth,
  [
    check('id').notEmpty().withMessage('Item id missing!'),
    check('quantity')
      .notEmpty()
      .isNumeric()
      .withMessage('Quantity must be a whole number!'),
  ],
  orderController.addItem
);

// @route     POST /ordera
// @desc      Submit order
// @access    Public
router.post(
  '/',
  auth,
  [
    // Data validations.
    check('pickup_time')
      .optional()
      .isNumeric()
      .withMessage('Please enter a number of minutes until pickup'),
    check('car_description').optional(),
    check('notes').optional(),
    check('payment')
      .notEmpty()
      .isIn(['paypal', 'applepay'])
      .withMessage('Payment must be either Paypal or Apple Pay'),
  ],
  orderController.submit
);

// @route     PUT /order
// @desc      Update an order
// @access    Private
router.put(
  '/:order_id',
  auth,
  [
    // Data validations.
    check('completed')
      .notEmpty()
      .isBoolean()
      .withMessage('Complete must be either true or false!'),
    check('priority')
      .notEmpty()
      .isIn([1, 2, 3])
      .withMessage('Priority must be either 1, 2, or 3!'),
  ],
  orderController.update
);

// @route     GET /orders
// @desc      Get all unfinished orders
// @access    Private
router.get('/', auth, orderController.getUnfinishedOrders);

// @route     GET /orders/me
// @desc      Get my current order (cart)
// @access    Private
router.get('/me', auth, orderController.getCart);

// @route     GET /orders/me
// @desc
// @access    Private
router.delete('/', auth, orderController.emptyCart);

module.exports = router;
