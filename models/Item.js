const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    // Please note this attribute is a link to a picture online
    item_name: {
        type: String,
        required: true,
        unique: true,
    },
    picture_link: {
        type: String,
        required: true,
        unique: true,
    },
    item_cost: {
        type: Number,
        required: true,
    },
    item_description: {
        type: String,
        required: true,
    },
    item_category: {
        type: String,
        required: true,
    },
    item_availability: {
        type: String,
        required: true,
    },
});

module.exports = Item = mongoose.model('item', ItemSchema);