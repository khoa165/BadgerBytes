const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  ordered_at: {
    type: Date,
    default: Date.now,
  },
  pickup_time: {
    type: Number,
  },

  paid: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 1,
  },

  total: {
    type: Number,
    required: true,
  },
  car_description: {
    type: String,
  },
  notes: {
    type: String,
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
