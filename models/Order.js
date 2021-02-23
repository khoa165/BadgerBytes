const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: new Date(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
    ],
    completion_time: {
        type: Date,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: Number,
        default: 1,
    },
    is_delivery: {  // true: delivery, false: pickup
        type: Boolean,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    car_description: {
        type: String,
    },
    address: {
        type: String,
    },
    notes: {
        type: String,
    },
});

module.exports = Order = mongoose.model('order', OrderSchema);
