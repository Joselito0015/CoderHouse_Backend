const Cart = require("../dao/class/cartDao");
const Product = require("../dao/class/ProductDao");
const Ticket = require("../dao/class/ticketDao");

const cart = new Cart();
const product = new Product();
const ticket = new Ticket();

const getAllCarts = async (req, res) => {
	const response = await cart.find();
	res.json({ resolve: response });
};

const getCartById = async (req, res) => {
	const { cid } = req.params;
	const response = await cart.findOnePopulate(cid);
	res.json({ resolve: response });
};

const createCart = async (req, res) => {
	//user only
	console.log(req.user);
	const _cart = { products: [], user: req.user._id };
	const response = await cart.create(_cart);
	res.json({ resolve: response });
};

const addProductToCart = async (req, res) => {
	//user only
	if (req.user.role !== "user") {
		return res.json({
			resolve: "No tienes permisos para realizar esta acción",
		});
	}
	const { cid, pid } = req.params;
	const _cart = await cart.findOne(cid);
	if (!_cart) {
		return res.json({ resolve: "Carrito no encontrado", response: _cart });
	}
	const listProductsfromCart = _cart.products;
	const indexProduct = listProductsfromCart.findIndex((p) => p._id == pid);
	if (indexProduct < 0) {
		const productFind = await product.findOne(pid);
		if (!productFind) {
			return res.json({
				resolve: "Producto no encontrado",
				response: productFind,
			});
		}
		const _product = { _id: pid, quantity: 1 };
		_cart.products.push(_product);
		const _response = await cart.updateOne(_cart);
		return res.json({
			resolve: "Producto agregado con éxito",
			response: _response,
		});
	} else {
		_cart.products[indexProduct].quantity += 1;
		const _response = await cart.updateOne(_cart);
		return res.json({ resolve: "Producto aumentado", response: _response });
	}
};

const deleteProductFromCart = async (req, res) => {
	const { cid, pid } = req.params;
	const _cart = await cart.findOne(cid);
	if (!_cart) {
		return res.json({ resolve: "Carrito no encontrado", response: _cart });
	}
	const listProductsfromCart = _cart.products;
	const indexProduct = listProductsfromCart.findIndex((p) => p._id == pid);
	if (indexProduct < 0) {
		return res.json({ resolve: "Producto no encontrado", response: _cart });
	}
	_cart.products.splice(indexProduct, 1);
	const _response = await cart.updateOne(_cart);
	res.json({ resolve: "Producto eliminado", response: _response });
};

const updateCartWithProducts = async (req, res) => {
	const { cid } = req.params;
	const { products } = req.body;
	const _cart = await cart.findOne(cid);
	if (!_cart) {
		return res.json({ resolve: "Carrito no encontrado", response: _cart });
	}
	_cart.products = products;
	const _response = await cart.updateOne(_cart);
	res.json({ resolve: "Carrito actualizado", response: _response });
};

const updateProductQuantity = async (req, res) => {
	const { cid, pid } = req.params;
	const { quantity } = req.body;
	const _cart = await cart.findOne(cid);
	if (!_cart) {
		return res.json({ resolve: "Carrito no encontrado", response: _cart });
	}
	const listProductsfromCart = _cart.products;
	const indexProduct = listProductsfromCart.findIndex((p) => p._id == pid);
	if (indexProduct < 0) {
		return res.json({ resolve: "Producto no encontrado", response: _cart });
	}
	_cart.products[indexProduct].quantity = quantity;
	const _response = await cart.updateOne(_cart);
	res.json({ resolve: "Producto actualizado", response: _response });
};

const clearCart = async (req, res) => {
	const { cid } = req.params;
	const _cart = await cart.findOne(cid);
	if (!_cart) {
		return res.json({ resolve: "Carrito no encontrado", response: _cart });
	}
	_cart.products = [];
	const _response = await cart.updateOne(_cart);
	res.json({ resolve: "Carrito vacío", response: _response });
};

const purchaseCart = async (req, res) => {
	const { cid } = req.params;
	const _cart = await cart.findOne(cid);
	if (!_cart) {
		return res.json({ resolve: "Carrito no encontrado", response: _cart });
	}

	const products = _cart.products;
	const productsToPurchase = [];
	const productsNotPurchased = [];
	let totalAmount = 0;

	for (let i = 0; i < products.length; i++) {
		const product = await product.findOne(products[i]._id);
		if (!product) {
			productsNotPurchased.push(products[i]._id);
			continue;
		}
		if (product.stock >= products[i].quantity) {
			product.stock -= products[i].quantity;
			await product.save();
			productsToPurchase.push(product);
			totalAmount += product.price * products[i].quantity;
		} else {
			productsNotPurchased.push(products[i]._id);
		}
	}

	if (productsToPurchase.length > 0) {
		const ticket = {
			purchaseDate: new Date(),
			amount: totalAmount,
			purchaser: req.user.email,
		};

		const _ticket = await ticket.create(ticket);

		// Actualizar carrito con productos no comprados
		_cart.products = _cart.products.filter((product) =>
			productsNotPurchased.includes(product._id)
		);
		await _cart.save();

		return res.json({
			resolve: "Compra realizada",
			response: _ticket,
			notPurchased: productsNotPurchased,
		});
	} else {
		return res.json({
			resolve: "No se pudo realizar la compra",
			notPurchased: productsNotPurchased,
		});
	}
};

module.exports = {
	getAllCarts,
	getCartById,
	createCart,
	addProductToCart,
	deleteProductFromCart,
	updateCartWithProducts,
	updateProductQuantity,
	clearCart,
	purchaseCart,
};
