// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

const itemsController = require('../controllers/item');

// @route     GET /items
// @desc      get data for all menu items
// @access    Public
router.get('/', itemsController.getAllMenuItems);

// @route     GET /items/:category
// @desc      get all menu items for specified category
// @access    Public
router.get('/:category', itemsController.getCategoryItems);

// @route     POST /items
// @desc      Create/update food item 
// @access    Admin
router.post(
    '/',
    auth,

    [
        // Data validations.
        check('item_name', 'Menu item name is required!').notEmpty(),
        check('picture_link', 'Menu item picture is required!')
            .notEmpty()
            .isURL(),
        check('item_cost', 'Menu item cost with $ is required!').notEmpty()
            .isNumeric()
            .withMessage('Please enter cost as an integer.'),
        check('item_description', 'Menu item description is required!').notEmpty(),
        check('item_category',).notEmpty(),
        check('item_availability')
            .notEmpty()
            .isIn(['In Stock!', 'Out of Stock'])
            .withMessage(
                'Item availability must be either "In Stock!" or "Out of Stock"'
            ),
    ],
    itemsController.createMenuItem
);

// @route     put /items
// @desc      Update availability of existing menu item
// @access    Staff version
router.put(
    '/',
    auth,
    [
        check('item_availability')
            .notEmpty()
            .isIn(['In Stock!', 'Out of Stock'])
            .withMessage(
                'Item availability must be either "In Stock!" or "Out of Stock"'
            ),
    ],
    itemsController.updateAvailability
)

module.exports = router;