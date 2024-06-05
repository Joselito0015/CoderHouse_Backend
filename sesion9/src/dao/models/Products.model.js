const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productCollection = "products";

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 2,
	},
	description: {
		type: String,
		required: true,
		minlength: 2,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	thumbnail: {
		type: String,
		required: true,
		minlength: 5,
	},
	code: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
		minlength: 2,
	},
	status: {
		type: Boolean,
		default: true,
		required: true,
	},
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productCollection, productSchema);

module.exports = Product;
