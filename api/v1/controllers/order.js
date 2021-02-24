// Validation.
const { validationResult } = require('express-validator');

// Link Order model.
const Order = require('../../../models/Order');

module.exports = {
  addItem: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { id, quantity } = req.body;

    try {
      let cart = await Order.findOne({
        user: req.user.id,
        paid: false,
        completed: false,
      });

      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ errors: [{ msg: 'Item not found' }] });
      }

      if (!cart) {
        cart = new Order({ items: [], cost: item.item_cost * quantity });
        cart.user = req.user.id;
        cart.items.push({ id, quantity });
        await cart.save();
      } else {
        const existedItem = await Order.findOne({
          _id: cart._id,
          'items.$.id': id,
        });
        if (existedItem) {
          console.log('update');
          await Order.updateOne(
            { _id: cart._id, 'items.$.id': id },
            {
              $inc: {
                'items.$.quantity': quantity,
                cost: item.item_cost * quantity,
              },
            }
          );
        } else {
          console.log('push');
          cart.items.push({ id, quantity });
          cart.cost += item.item_cost * quantity;
          await cart.save();
        }
      }

      return res.status(200).json({ cart });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  submit: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { pickup_time, car_description, notes } = req.body;

    try {
      const errors = [];

      // Add time to pickup to time now to get completion time
      let completion_time = new Date(
        new Date().getTime() + time_to_pickup * 60000
      );

      const cart = await Order.findOne({
        user: req.user.id,
        paid: false,
        completed: false,
      });

      cart.paid = true;
      cart.ordered_at = new Date();
      if (pickup_time) {
        cart.pickup_time = pickup_time;
      } else {
        cart.pickup_time = 60;
      }
      if (car_description) cart.car_description = car_description;
      if (notes) cart.notes = notes;

      await cart.save();
      return res.status(200).json({ cart });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  update: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { priority, completed } = req.body;
    const id = req.params.order_id;

    try {
      // Check if user attempting to create or update menu item is admin
      if (req.user) {
        let user = await User.findById(req.user.id);
        if (!user.admin) {
          return res.status(401).json({
            errors: [
              {
                msg:
                  'Unauthorized access, only staff and admin can update orders!',
              },
            ],
          });
        }
      }
      const order = await Order.findById(id);

      order.priority = priority;
      order.completed = completed;

      await order.save();
      return res.status(200).json({ msg: 'Order updated!' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  getUnfinishedOrders: async (req, res, _next) => {
    try {
      // Check if user attempting to create or update menu item is admin
      if (req.user) {
        let user = await User.findById(req.user.id);
        if (!user.admin && !user.staff) {
          return res.status(401).json({
            errors: [
              {
                msg:
                  'Unauthorized access, only staff and admin can view all orders!',
              },
            ],
          });
        }
      }
      // Return all orders
      const orders = await Order.find({
        paid: true,
        completed: false,
      });

      return res.status(200).json(orders);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
