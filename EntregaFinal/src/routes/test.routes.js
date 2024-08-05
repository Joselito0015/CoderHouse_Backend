const { Router } = require("express");
const { sendEmail } = require("../utils/sendEmail.js");
const testRouter = Router();

testRouter.get("/loggers", (req, res) => {
	req.logger.info("Log de info");
	req.logger.error("Log de error");
	req.logger.warning("Log de warning");
	req.logger.http("Log de http");
	req.logger.debug("Log de debug");
	res.send("Logs enviados");
});

testRouter.get("/test-email", (req, res) => {
	sendEmail(
		"destinatario@example.com",
		"Correo de Prueba",
		"Este es un correo de prueba."
	);
	res.send("Correo enviado");
});

module.exports = testRouter;
