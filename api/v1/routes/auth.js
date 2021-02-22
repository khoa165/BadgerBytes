// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Authentication controller.
const authController = require('../controllers/auth');

// @route     GET /auth
// @desc      Get authenticated user.
// @access    Public
router.get('/', auth, authController.getUser);

// @route     POST /auth
// @desc      Authenticate user & get token.
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('email', 'Email is required!').notEmpty(),
    check('password', 'Password is required!').notEmpty(),
  ],
  authController.login
);

module.exports = router;
