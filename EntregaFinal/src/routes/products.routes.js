const { Router } = require("express");
const {
	getAllProducts,
	getOneProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/controller.products");

const passport = require("passport");

//GET - ALL PRODUCTS
const productsRouter = Router();

productsRouter.get("/", getAllProducts);

//GET - ONE PRODUCT
productsRouter.get("/:pid", getOneProduct);

//POST - CREATE PRODUCT
productsRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	createProduct
);

//PUT - UPDATE PRODUCT
productsRouter.put(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	updateProduct
);

//DELETE - DELETE PRODUCT
productsRouter.delete(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	deleteProduct
);

console.log("productsRouter");

module.exports = productsRouter;
