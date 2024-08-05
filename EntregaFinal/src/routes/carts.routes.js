const { Router } = require("express");
const {
	getAllCarts,
	getCartById,
	createCart,
	addProductToCart,
	deleteProductFromCart,
	updateCartWithProducts,
	updateProductQuantity,
	clearCart,
} = require("../controllers/controller.carts");
const passport = require("passport");
const router = Router();

router.get("/", getAllCarts);
router.get("/:cid", getCartById);
router.post("/", passport.authenticate("jwt", { session: false }), createCart);
router.post(
	"/:cid/product/:pid",
	passport.authenticate("jwt", { session: false }),
	addProductToCart
);
router.delete("/:cid/product/:pid", deleteProductFromCart);
router.put("/:cid", updateCartWithProducts);
router.put("/:cid/product/:pid", updateProductQuantity);
router.delete("/:cid", clearCart);

module.exports = router;
