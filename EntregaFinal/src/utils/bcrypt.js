const bcrypt = require("bcryptjs");

const createHash = (password) =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const validatePassword = (passwordSend, passwordBdd) =>
	bcrypt.compareSync(passwordSend, passwordBdd);

module.exports = { createHash, validatePassword };
