//  use fakerjs to  generate fake data for products
const { faker } = require("@faker-js/faker");
const Product = require("../dao/models/Products.model");

const generateProducts = (quantity) => {
	const products = [];
	for (let i = 0; i < quantity; i++) {
		const product = {
			title: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			thumbnail: faker.image.url(),
			code: faker.number.int({ min: 100, max: 10000 }), // 57,
			stock: faker.number.int({ min: 0, max: 1000 }),
			category: faker.commerce.department(),
			status: faker.datatype.boolean(0.7),
		};
		products.push(product);
	}
	return products;
};

const seedProducts = async (quantity = 100) => {
	const products = generateProducts(quantity);
	console.log(products, "products to seed");
	await Product.deleteMany({});
	await Product.insertMany(products);
	console.log("Products seeded");
};

module.exports = seedProducts;
