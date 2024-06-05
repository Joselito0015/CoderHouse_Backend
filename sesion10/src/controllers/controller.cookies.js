const setCookie = (req, res) => {
	res
		.cookie("CookieCookie", "Esto es una cookie :)", {
			maxAge: 3000000,
			signed: true,
		})
		.send("Cookie creada");
};

const getCookie = (req, res) => {
	res.send(req.signedCookies);
};

const deleteCookie = (req, res) => {
	res.clearCookie("CookieCookie").send("Cookie eliminada");
};

module.exports = {
	setCookie,
	getCookie,
	deleteCookie,
};
