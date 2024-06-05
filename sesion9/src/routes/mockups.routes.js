const generateProducts = require("../controllers/controller.mockups");
const { Router } = require("express");

const mockupsRouter = Router();

mockupsRouter.get("/mockingproducts", generateProducts);

module.exports = mockupsRouter;
