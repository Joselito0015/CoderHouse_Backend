const passport = require("passport");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

const loginUser = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).send("Usuario o contraseña no validos");
		}

		// Generar el token JWT
		const token = jwt.sign({ user: { _id: req.user._id } }, config.jwt_secret, {
			expiresIn: "1h",
		});

		// Establecer la cookie con el token
		res.cookie("jwtCookie", token, { httpOnly: true, secure: true });

		req.session.user = {
			email: req.user.email,
			first_name: req.user.first_name,
		};

		res.status(200).send("Usuario logueado correctamente");
	} catch (e) {
		res.status(500).send("Error al loguear usuario");
	}
};

const registerUser = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(400).send("Usuario ya existente en la aplicacion");
		}

		res.status(200).send("Usuario creado correctamente");
	} catch (e) {
		res.status(500).send("Error al registrar usuario");
	}
};

const renderRegisterForm = async (req, res) => {
	res.render("register.handlebars");
};

const logoutUser = (req, res) => {
	req.session.destroy((e) => {
		if (e) {
			console.log(e);
		} else {
			res.clearCookie("jwtCookie"); // Limpiar la cookie JWT al cerrar sesión
			res.status(200).redirect("/api/users/login");
		}
	});
};

const getSession = (req, res) => {
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
};

const githubAuth = passport.authenticate("github", { scope: ["user:email"] });

const githubSession = (req, res) => {
	req.session.user = {
		email: req.user.email,
		first_name: req.user.name,
	};
	res.redirect("/api/products");
};

module.exports = {
	loginUser,
	registerUser,
	renderRegisterForm,
	logoutUser,
	getSession,
	githubAuth,
	githubSession,
};
