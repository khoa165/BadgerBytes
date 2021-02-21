// Server routing.
const express = require('express');
const router = express.Router();

// Validation.
const { check } = require('express-validator');

// User controller.
const userController = require('../controllers/user');

// @route     POST /users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('name').notEmpty(),
    check('email', 'Please enter a valid email!').isEmail(),
    check('phone').notEmpty(),
    check('address').notEmpty(),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters long!')
      .matches(/\d/)
      .withMessage('Password must contain a number!'),
    check('confirmedPassword').notEmpty(),
  ],
  userController.register
);

// @route     PUT /users
// @desc      Update user information
// @access    Private
router.put(
  '/',
  auth,
  [
    // Data validations.
    check('name').notEmpty(),
    check('email', 'Please enter a valid email!').isEmail(),
    check('phone').notEmpty(),
    check('address').notEmpty(),
  ],
  userController.update
);

module.exports = router;
