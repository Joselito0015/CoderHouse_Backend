const { Router } = require("express");
const {
	loginUser,
	registerUser,
	renderRegisterForm,
	logoutUser,
	getSession,
	githubAuth,
	githubSession,
} = require("../controllers/controller.sessions");
const passport = require("passport");

const sessionsRouter = Router();

sessionsRouter.post(
	"/login",
	passport.authenticate("login", {
		session: false,
		failureRedirect: "/views/login",
		failureFlash: true,
	}),
	loginUser
);

sessionsRouter.post(
	"/register",
	passport.authenticate("register", {
		successRedirect: "/views/cart",
		failureRedirect: "/views/register",
		failureFlash: true,
	})
);

sessionsRouter.get("/register", renderRegisterForm);

sessionsRouter.get("/logout", logoutUser);

sessionsRouter.get("/session", getSession);

sessionsRouter.get("/github", githubAuth);

sessionsRouter.get(
	"/githubSession",
	passport.authenticate("github"),
	githubSession
);

sessionsRouter.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.status(200).send("Usuario logueado");
	}
);

sessionsRouter.get(
	"/testJWT",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.status(200).send(req.user);
	}
);

module.exports = sessionsRouter;
