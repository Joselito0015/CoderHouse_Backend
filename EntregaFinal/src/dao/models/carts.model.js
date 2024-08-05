const mongoose = require("mongoose");

const cartsCollection = "carts";

// This is the schema for a cart.
const cartSchema = new mongoose.Schema({
	products: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products",
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		default: "active",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
});

const carts = mongoose.model(cartsCollection, cartSchema);

module.exports = carts;
