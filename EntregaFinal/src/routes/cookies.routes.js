const { Router } = require("express");
const {
	setCookie,
	getCookie,
	deleteCookie,
} = require("../controllers/controller.cookies");

const router = Router();

router.get("/setCookie", setCookie);
router.get("/getCookie", getCookie);
router.get("/deleteCookie", deleteCookie);

module.exports = router;
