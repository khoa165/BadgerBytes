// Validation.
const { validationResult } = require('express-validator');

// Link Order model.
const Order = require('../../../models/Order');

module.exports = {
    submit: async (req, res, _next) => {

        // Check for errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructuring data from request body.
        const {
            items,
            time_to_pickup,
            car_description,
            address,
            is_delivery,
            notes,
        } = req.body;

        try {
            const errors = [];
            let user = await User.findById(req.user.id);

            // Add time to pickup to time now to get completion time
            let completion_time = new Date(new Date().getTime() + time_to_pickup*60000);

            // If delivery, make sure address is included
            if (is_delivery && address==undefined) {
                errors.push({
                    msg: 'Must include an address for delivery orders.',
                });
            }

            // Add up items to get cost
            let cost = 0;
            for (i = 0; i < items.length; i++) {
                let curr_item = await Item.findById(items[i]);
                cost += curr_item.item_cost;
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            // Create new order.
            order = new Order({
                user,
                items,
                completion_time,
                cost,
                is_delivery,
                car_description,
                address,
                notes,
            });
            await order.save();
            return res.status(200).json( {order} );

        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                errors: [
                    { msg: 'Unexpected server error happened. Please try again later!' },
                ],
            });
        }
    },

    collect: async (req, res, _next) => {
        try {
            // Check if user attempting to create or update menu item is admin
            if(req.user) {
                let user = await User.findById(req.user.id);
                if(!user.admin && !user.staff) {
                    return res.status(401).json({ errors: [{ msg: 'Unauthorized access, only staff and admin can get all orders!' }] });
                }
            }
            // Return all orders
            const orders = await Order.find();

            if (!orders) {
                return res.status(404).json({ errors: [{ msg: 'No orders in the system!' }] });
            }

            return res.status(200).json( orders );
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
