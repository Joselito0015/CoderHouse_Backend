const { Router } = require("express");
const {
	getAllProducts,
	getOneProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/controller.products");

//GET - ALL PRODUCTS

const productsRouter = Router();

productsRouter.get("/", getAllProducts);

//GET - ONE PRODUCT
productsRouter.get("/:pid", getOneProduct);

//POST - CREATE PRODUCT
productsRouter.post("/", createProduct);

//PUT - UPDATE PRODUCT
productsRouter.put("/:pid", updateProduct);

//DELETE - DELETE PRODUCT
productsRouter.delete("/:pid", deleteProduct);

console.log("productsRouter");

module.exports = productsRouter;
