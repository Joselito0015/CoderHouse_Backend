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

const router = Router();

router.get("/", getAllCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/product/:pid", addProductToCart);
router.delete("/:cid/product/:pid", deleteProductFromCart);
router.put("/:cid", updateCartWithProducts);
router.put("/:cid/product/:pid", updateProductQuantity);
router.delete("/:cid", clearCart);

module.exports = router;
