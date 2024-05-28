const productsRouter = require("./products.routes");
const sessionsRouter = require("./sessions.routes");
const cartsRouter = require("./carts.routes");
const cookiesRouter = require("./cookies.routes");

const router = (app) => {
	app.use("/api/products", productsRouter);
	app.use("/api/carts", cartsRouter);
	app.use("/api/cookies", cookiesRouter);
	app.use("/api/session", sessionsRouter);
};

module.exports = router;
