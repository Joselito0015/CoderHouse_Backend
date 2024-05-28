const { config } = require("../src/config/index.js");
const mongoose = require("mongoose");

const mongoConnect = async (app) => {
	try {
		await mongoose.connect(config.mongoDB);

		console.log("db is connected");
	} catch (error) {
		console.log(error);
		console.log("db is NOT connected");
	}
};

module.exports = mongoConnect;
