const seedProducts = require("../utils/mockup");

const generateProducts = async (req, res) => {
	const quantity = req.query.quantity || 100;
	await seedProducts(quantity);
	res.json({ resolve: "Products seeded" });
};

module.exports = generateProducts;
