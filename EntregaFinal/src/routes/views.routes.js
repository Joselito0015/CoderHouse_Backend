const { Router } = require("express");
const {
	renderCart,
	renderPurchase,
	renderLogin,
} = require("../controllers/controller.views");
const passport = require("passport");

const viewsRouter = Router();

viewsRouter.get(
	"/cart",
	passport.authenticate("jwt", { session: false }),
	renderCart
);

viewsRouter.get(
	"/purchase",
	passport.authenticate("jwt", { session: false }),
	renderPurchase
);

viewsRouter.get("/login", renderLogin);

module.exports = viewsRouter;
