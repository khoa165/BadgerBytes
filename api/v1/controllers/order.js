// Validation.
const { validationResult } = require('express-validator');

// Link Order model.
const Order = require('../../../models/Order');

module.exports = {

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
