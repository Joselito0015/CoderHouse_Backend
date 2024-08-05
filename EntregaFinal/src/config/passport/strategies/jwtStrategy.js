const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const UserDao = require("../../../dao/class/UserDao");
const { config } = require("../../index.js");

const User = new UserDao();

const cookieExtractor = (req) => {
	const token = req && req.cookies ? req.cookies.jwtCookie : null;
	return token;
};

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
	secretOrKey: config.jwt_secret,
};

const strategyJWT = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findById(payload.user._id);
		if (!user) {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, null);
	}
});

module.exports = strategyJWT;
