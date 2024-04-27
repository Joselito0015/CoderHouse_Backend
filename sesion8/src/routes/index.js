const productsController = require("../controllers/controller.products");
const cartsController = require("../controllers/controller.carts");
const cookieController = require("../controllers/controller.cookies");
const sessionsController = require("../controllers/controller.sessions");

const router = (app) => {
	app.use("/api/products", productsController);
	app.use("/api/carts", cartsController);
	app.use("/api/cookies", cookieController);
	app.use("/api/session", sessionsController);
};

module.exports = router;
