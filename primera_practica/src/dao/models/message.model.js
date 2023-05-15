// models/Cart.js
const mongoose = require('mongoose')

const MessagesCollection = 'Message'

// This is the schema for a cart.
const MessagesSchema = new mongoose.Schema({
    usermail: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'active' }
})

const Messages = mongoose.model(MessagesCollection, MessagesSchema)

module.exports = Messages