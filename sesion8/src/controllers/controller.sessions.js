const { Router } = require("express");
const UserDao = require("../dao/class/UserDao");
const passport = require("passport");
const userDao = new UserDao();

const router = Router();

// router.get("/login", async (req, res) => {
// 	//login form from handlebars file login.handlebars
// 	res.render("login.handlebars");
// });

//post login
router.get("/login", passport.authenticate("login"), async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).send("Usuario o contraseña no validos");
		}

		req.session.user = {
			email: req.user.email,
			first_name: req.user.first_name,
		};

		res.status(200).send("Usuario logueado correctamente");
	} catch (e) {
		res.status(500).send("Error al loguear usuario");
	}
});

router.post(
	"/register",
	passport.authenticate("register"),
	async (req, res) => {
		try {
			if (!req.user) {
				return res.status(400).send("Usuario ya existente en la aplicacion");
			}

			res.status(200).send("Usuario creado correctamente");
		} catch (e) {
			res.status(500).send("Error al registrar usuario");
		}
	}
);

router.get("/register", async (req, res) => {
	//register form from handlebars file register.handlebars
	res.render("register.handlebars");
});

router.get("/logout", (req, res) => {
	req.session.destroy(function (e) {
		if (e) {
			console.log(e);
		} else {
			res.status(200).redirect("/api/users/login");
		}
	});
});

router.get("/session", (req, res) => {
	console.log(req.session);
	if (req.session.counter) {
		req.session.counter++;
		res.send(
			`Eres el usuario N° ${req.session.counter} en ingresar a la pagina`
		);
	} else {
		req.session.counter = 1;
		res.send("Eres el primer usuario que ingresa a la pagina");
	}
});

router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] }),
	async (req, res) => {
		r;
	}
);

router.get(
	"/githubSession",
	passport.authenticate("github"),
	async (req, res) => {
		console.log(req);
		req.session.user = {
			email: req.user.email,
			first_name: req.user.name,
		};
		res.redirect("/api/products");
	}
);

router.get("/logout", (req, res) => {
	req.session.destroy(function (e) {
		if (e) {
			console.log(e);
		} else {
			res.status(200).redirect("/");
		}
	});
});

module.exports = router;
