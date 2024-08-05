const productsRouter = require("./products.routes");
const sessionsRouter = require("./sessions.routes");
const cartsRouter = require("./carts.routes");
const cookiesRouter = require("./cookies.routes");
const mockupsRouter = require("./mockups.routes");
const testRouter = require("./test.routes");
const usersRouter = require("./users.routes");
const viewsRouter = require("./views.routes");

const router = (app) => {
	app.use("/api/products", productsRouter);
	app.use("/api/carts", cartsRouter);
	app.use("/api/cookies", cookiesRouter);
	app.use("/api/session", sessionsRouter);
	app.use("/api/mockups", mockupsRouter);
	app.use("/api/test", testRouter);
	app.use("/api/users", usersRouter);
	app.use("/", viewsRouter);
};

module.exports = router;
