const mongoose = require('mongoose');

const cartsCollection = 'carts';

// This is the schema for a cart.
const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    }],
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'active'
    }
});

const carts = mongoose.model(cartsCollection, cartSchema);

module.exports = carts;
