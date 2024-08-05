const app = require("./index");
const { config } = require("./config");

app.listen(config.port, () => {
	console.log("listening on port " + config.port);
});
