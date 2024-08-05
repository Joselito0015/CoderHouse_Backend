const cartDao = require("../dao/class/cartDao");
const Cart = new cartDao();

const renderCart = async (req, res) => {
	try {
		const userCart = await Cart.findOnePopulate({ user: req.user._id });
		res.render("cart.handlebars", { cart: userCart });
	} catch (error) {
		res.status(500).send("Error al obtener el carrito");
	}
};

const renderPurchase = async (req, res) => {
	try {
		const userCart = await Cart.findOnePopulate({
			user: req.user._id,
		});
		const totalAmount = userCart.products.reduce(
			(acc, item) => acc + item._id.price * item.quantity,
			0
		);
		res.render("purchase.handlebars", { totalAmount: totalAmount });
	} catch (error) {
		res.status(500).send("Error al obtener el carrito para la compra");
	}
};
const renderLogin = (req, res) => {
	res.render("login.handlebars");
};
module.exports = {
	renderCart,
	renderPurchase,
	renderLogin,
};
