const { opts } = require("./commander/commander.js");

console.log(opts.mode, "config index");

require("dotenv").config({
	path: `.env.${opts.mode}`,
});

const config = {
	port: process.env.PORT,
	mongoDB: process.env.MONGODB,
	jwt_secret: process.env.JWT_SECRET,
};

console.log(config, "config");

module.exports = { config };
