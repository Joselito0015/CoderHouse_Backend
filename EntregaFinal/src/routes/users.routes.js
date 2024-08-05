const { Router } = require("express");
const {
	getAllUsers,
	deleteInactiveUsers,
	updateUserRole,
	deleteUser,
} = require("../controllers/controller.users");
const passport = require("passport");

const usersRouter = Router();

usersRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	getAllUsers
);

usersRouter.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	deleteInactiveUsers
);

usersRouter.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	updateUserRole
);

usersRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	deleteUser
);

module.exports = usersRouter;
