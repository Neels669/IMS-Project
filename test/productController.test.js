const assert = require('assert');
const app = require('../index');
const request = require('supertest');
const { seedCategories } = require('./categoryController.test');
const { Product } = require('../models');

describe('Product Controller', () => {
	beforeEach(async () => {
		await seedCategories();
		await seedProducts();
	});

	describe('GET /products', () => {
		it('should return all products', async () => {
			const res = await request(app).get('/products');
			assert.strictEqual(res.status, 200);
			assert.strictEqual(Array.isArray(res.body), true);
			assert.strictEqual(res.body.length, 5);
		});
	});

	describe('GET /products/:id', () => {
		it('should return a single product by id', async () => {
			const productId = 1;
			const res = await request(app).get(`/products/${productId}`);
			assert.strictEqual(res.status, 200);
			const product = res.body;
			assert.strictEqual(typeof product, 'object');
			assert.strictEqual(product.id, productId);
		});
	});

});


async function seedProducts() {
	const testData = [
		{ id: 1, name: 'Product 1', price: 10.99, stock: 100, categoryId: 1 },
		{ id: 2, name: 'Product 2', price: 15.99, stock: 50, categoryId: 2 },
		{ id: 3, name: 'Product 3', price: 20.99, stock: 200, categoryId: 3 },
		{ id: 4, name: 'Product 4', price: 5.99, stock: 75, categoryId: 4 },
		{ id: 5, name: 'Product 5', price: 8.99, stock: 150, categoryId: 5 }
	];

	await Product.bulkCreate(testData);
}
