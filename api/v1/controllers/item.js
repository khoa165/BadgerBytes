// Link User model.
const { validationResult } = require('express-validator');
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
    },

    createMenuItem: async(req, res, _next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructuring data from request body.
        const {
            _id,
            item_name,
            picture_link,
            item_cost,
            item_description,
            item_category,
            item_availability,
        } = req.body;
        
        try {
            // Check if user attempting to create or update menu item is admin
            if(req.user) {
                let user = await User.findById(req.user.id);
                if(!user.admin) {
                    return res.status(401).json({ errors: [{ msg: 'Unauthorized access, user is not an admin. Only admin can create an item!' }] });
                }
            }

            // Admin updating the fields of an existing item
            if(_id) {
                const itemFound = await Item.findById(_id);
                if(!itemFound) {
                    return res.status(404).json({ errors: [{ msg: 'Menu item not found! Could not update the existing menu item' }] });
                }

                // Admin is attempting to update the name of the menu item
                if(itemFound.item_name !== item_name) {
                    // Check if menu item already exists
                    let sameItem = await Item.findOne({ item_name });
                    if(sameItem) {
                        console.log("In here too");
                        return res.status(400).json({ errors: [{ msg: 'Menu item name already exists. Please provide new name or entirely new menu item!' }] });
                    }
                }

                // Admin is attempting to update the link to the picture
                if(itemFound.picture_link !== picture_link) {
                    // Check if menu item picture already exists
                    let samePicture = await Item.findOne({ picture_link });
                    if(samePicture) {
                        return res.status(400).json({ errors: [{ msg: 'Menu item picture already exists. Please provide new url to picture!' }] });
                    }
                }

                itemFound.item_name = item_name;
                itemFound.picture_link = picture_link;
                itemFound.item_cost = item_cost;
                itemFound.item_description = item_description;
                itemFound.item_category = item_category;
                itemFound.item_availability = item_availability;
                
                await itemFound.save();
                return res.status(200).json(itemFound);
            }

            // Reached here, this means admin wants to create a new menu item

            // Check if menu item already exists
            const sameItem = await Item.findOne({ item_name });
            if(sameItem) {
                return res.status(400).json({ errors: [{ msg: 'Menu item name already exists. Please provide new name or entirely new menu item!' }] });
            }

            // Check if menu item picture already exists
            const samePicture = await Item.findOne({ picture_link });
            if(samePicture) {
                return res.status(400).json({ errors: [{ msg: 'Menu item picture already exists. Please provide new url to picture!' }] });
            }

            // Create new menu item
            const item = new Item({
                item_name,
                picture_link,
                item_cost,
                item_description,
                item_category,
                item_availability,
            });

            await item.save();
            return res.status(200).json(item);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                errors: [
                { msg: 'Unexpected server error happened. Could not create a new menu item.' },
                ],
            });
        }
    },

    updateAvailability: async(req, res, _next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructuring data from request body.
        const {
            _id,
            item_name,
            picture_link,
            item_cost,
            item_description,
            item_category,
            item_availability,
        } = req.body;

        try {
            // Check if user attempting to create or update menu item is admin
            let user = await User.findById(req.user.id);
            if(!user.staff) {
                return res.status(401).json({ errors: [{ msg: 'Unauthorized access, user is not an admin or staff. Only admin or staff can update an item!' }] });
            }

            if(!_id) {
                return res.status(401).json({ errors: [{ msg: 'Unauthorized access, user is not an admin. Only admin can create an item! Staff may only update availability of item' }] });
            }

            const itemFound = await Item.findById(_id);
            if(!itemFound) {
                return res.status(404).json({ errors: [{ msg: 'Menu item not found! Could not update the existing menu item' }] });
            }

            if(itemFound.item_name != item_name || itemFound.picture_link != picture_link || itemFound.item_cost != item_cost || 
               itemFound.item_description != item_description || itemFound.item_category != item_category) {
                return res.status(401).json({ errors: [{ msg: 'Unauthorized access, staff may not update anything about an item except availability' }] });
            }

            itemFound.item_availability = item_availability;
                
            await itemFound.save();
            return res.status(200).json(itemFound);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                errors: [
                { msg: 'Unexpected server error happened. Could not update availability of menu item.' },
                ],
            });
        }



        

    },
}