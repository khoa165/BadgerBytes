// Link User model.
const Item = require('../../../models/Item');

module.exports = {
    getAllMenuItems: async(req, res, _next) => {
        try {
            // Retrieve all menu items
            const items = await Item.find();
            if (!items) {
                return res.status(404).json({ errors: [{ msg: 'No menu items, please add some!' }] });
            }

            return res.status(200).json(items);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                errors: [
                { msg: 'Unexpected server error happened. Could not get menu items.' },
                ],
            });
        }
    },

    getCategoryItems: async(req, res, _next) => {
        try {
            // Retrieve all menu items for a specified category
            const category_items = await Item.find({item_category: req.item.category});
            if (!category_items) {
                return res.status(404).json({ errors: [{ msg: 'No menu items for this cateogry exist' }] });
            }
            return res.status(200).json(category_items);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                errors: [
                { msg: 'Unexpected server error happened. Could not get menu items for specified category.' },
                ],
            });
        }
    }

}