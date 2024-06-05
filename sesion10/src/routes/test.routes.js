const { Router } = require("express");

const testRouter = Router();

testRouter.get("/loggers", (req, res) => {
	req.logger.info("Log de info");
	req.logger.error("Log de error");
	req.logger.warning("Log de warning");
	req.logger.http("Log de http");
	req.logger.debug("Log de debug");
	res.send("Logs enviados");
});

module.exports = testRouter;
