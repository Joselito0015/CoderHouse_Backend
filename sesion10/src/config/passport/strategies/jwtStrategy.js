const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const UserDao = require("../../../dao/class/UserDao");
const { config } = require("../../index.js");

const User = new UserDao();

const cookieExtractor = (req) => {
	console.log(req.cookies);
	//{} no hay cookies != esta cookie no existe
	//Si existen cookies, asigno mi cookie en especifico
	const token = req.cookies ? req.cookies.jwtCookie : {};
	console.log(token);
	return token;
};

const jwtOptions = {
	//jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //esperar el token de JWT desde la peticion
	//jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]) consultando desde las cookies
	secretOrKey: config.jwt_secret,
};

const strategyJWT = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		console.log(payload);
		const user = await User.findById(payload.user._id);
		console.log(user);
		if (!user) {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, null);
	}
});

module.exports = strategyJWT;
