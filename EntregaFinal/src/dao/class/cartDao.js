const Cart = require("../models/carts.model");

class cartDao {
	find = async () => {
		try {
			const carts = await Cart.find().lean();
			return carts;
		} catch (error) {
			return error;
		}
	};

	create = async (cart) => {
		try {
			const response = await Cart.create(cart);
			return response;
		} catch (error) {
			return error;
		}
	};

	findOne = async (_id) => {
		const filter = { _id: _id };
		try {
			const cart = await Cart.findOne(filter).lean();
			return cart;
		} catch (error) {
			return error;
		}
	};

	findOnePopulate = async (filter) => {
		try {
			const cart = await Cart.findOne(filter)
				.lean()
				.populate("products._id")
				.exec();
			return cart;
		} catch (error) {
			return error;
		}
	};

	deleteOne = async (_id) => {
		const filter = { _id: _id };
		try {
			const response = await Cart.deleteOne(filter);
			return response;
		} catch (error) {
			return error;
		}
	};

	updateOne = async (_Cart) => {
		const { _id, ...rest } = _Cart;
		const filter = { _id: _id };
		console.log(filter, "filter");
		console.log(rest, "rest");

		try {
			const response = await Cart.updateOne(filter, rest, {
				new: true, // Devuelve el documento actualizado
			}).lean();
			return response;
		} catch (error) {
			return error;
		}
	};
	save = async () => {
		try {
			const response = await Cart.save();
			return response;
		} catch (error) {
			return error;
		}
	};
}

module.exports = cartDao;
