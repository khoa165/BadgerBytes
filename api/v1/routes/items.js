// Server routing.
const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/item');

// @route     GET /items
// @desc      get data for all menu items
// @access    Public
router.get('/', itemsController.getAllMenuItems);

// @route     GET /items/:category
// @desc      get all menu items for specified category
// @access    Public
router.get('/:category', itemsController.getCategoryItems);

module.exports = router;