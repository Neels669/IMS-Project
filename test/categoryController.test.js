const assert = require('assert');
const app = require('../index');
const request = require('supertest');
const { Category } = require('../models');

describe('Category Controller', () => {
	beforeEach(async () => {
		await seedCategories();
	});
	
	describe('GET /categories', () => {
		it('should return all categories', async () => {
			const res = await request(app).get('/categories');
			assert.strictEqual(res.status, 200);
			assert.strictEqual(Array.isArray(res.body), true);
			assert.strictEqual(res.body.length, 5);
		});
	});

	describe('GET /categories/:id', () => {
		it('should return a single category by id', async () => {
			const categoryId = 1;
			const res = await request(app).get(`/categories/${categoryId}`);
			assert.strictEqual(res.status, 200);
			const category = res.body;
			assert.strictEqual(typeof category, 'object');
			assert.strictEqual(category.id, categoryId);
		});
	});

});

async function seedCategories() {
	const testData = [
		{ id: 1, name: 'Category 1' },
		{ id: 2, name: 'Category 2' },
		{ id: 3, name: 'Category 3' },
		{ id: 4, name: 'Category 4' },
		{ id: 5, name: 'Category 5' }
	];
	await Category.bulkCreate(testData);
}

module.exports = { seedCategories };
