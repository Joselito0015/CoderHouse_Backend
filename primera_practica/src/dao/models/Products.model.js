const mongoose = require('mongoose')


const ProductCollection = 'Product'

const ProductSchema = new mongoose.Schema(
    {
		"title": {
            type:String,
            required: true,
            minlength: 3},
		"description": {
            type:String,
            required: true,
            minlength: 5},
		"price": {
            type:Number,
            required: true,
            min: 0},
		"thumbnail": {
            type:String,
            required: true,
            minlength: 5},
		"code": {
            type:Number,
            required: true},
		"stock": {
            type:Number,
            required: true},
		"category": {
            type:String,
            required: true,
            minlength: 5},
		"status": {
            type:Boolean,
            default: true,
            required: true}
	})

const Product = mongoose.model(ProductCollection, ProductSchema)

module.exports = Product