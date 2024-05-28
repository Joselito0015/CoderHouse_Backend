const local = require("passport-local");
const passport = require("passport");
const crypto = require("crypto");
const GithubStrategy = require("passport-github2").Strategy;
const UserDao = require("../../dao/class/UserDao");
const { createHash, validatePassword } = require("../../utils/bcrypt");

const userModel = new UserDao();

//Passport trabaje con uno o mas middlewares
const localStrategy = local.Strategy;

const initializePassport = () => {
	//Definir en que rutas se aplican mis estrategias
	passport.use(
		"register",
		new localStrategy(
			{ passReqToCallback: true, usernameField: "email" },
			async (req, username, password, done) => {
				try {
					const { first_name, last_name, email, password, age } = req.body;
					const findUser = await userModel.findOne({ email: email });
					if (findUser) {
						return done(null, false);
					} else {
						const user = await userModel.create({
							first_name: first_name,
							last_name: last_name,
							email: email,
							age: age,
							password: createHash(password),
						});
						return done(null, user);
					}
				} catch (e) {
					return done(e);
				}
			}
		)
	);

	//Inicializar la sesion del usuario
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	//Eliminar la sesion del usuario
	passport.deserializeUser(async (id, done) => {
		const user = await userModel.findOne({ _id: id });
		done(null, user);
	});

	passport.use(
		"login",
		new localStrategy(
			{ usernameField: "email" },
			async (username, password, done) => {
				try {
					const user = await userModel.findOne({ email: username });
					if (user && validatePassword(password, user.password)) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				} catch (e) {
					return done(e);
				}
			}
		)
	);

	passport.use(
		"github",
		new GithubStrategy(
			{
				clientID: "bfe7c56ad8e3bc9083ef",
				clientSecret: "4b815a9ff2272067b4d6a2bd919692fd7795419c",
				callbackURL: "http://localhost:8080/api/session/githubSession",
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const user = await userModel.findOne({ email: profile._json.email });
					if (user) {
						done(null, user);
					} else {
						const randomNumber = crypto.randomUUID();
						console.log(profile._json);
						const userCreated = await userModel.create({
							first_name: profile._json.name,
							last_name: " ",
							email: profile._json.email,
							age: 18,
							password: createHash(`${profile._json.name}`),
						});
						console.log(randomNumber);
						return done(null, userCreated);
					}
				} catch (error) {
					return done(error);
				}
			}
		)
	);
};

module.exports = initializePassport;
