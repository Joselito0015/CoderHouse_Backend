// models/Cart.js
const mongoose = require('mongoose')

const CartsCollection = 'Carts'

// This is the schema for a cart.
const CartSchema = new mongoose.Schema({
      products: [ ],
      date: { type: Date, default: Date.now },
      status: { type: String, default: 'active' }
 
})

const Carts = mongoose.model(CartsCollection, CartSchema)

module.exports = Carts