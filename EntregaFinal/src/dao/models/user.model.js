const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		index: true,
	},
	rol: {
		type: String,
		default: "usuario",
	},
	cart_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "carts",
	},
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
