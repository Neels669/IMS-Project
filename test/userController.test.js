const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const seedUser = async () => {
	const testData = [
		{ username: 'testuser1', password: await bcrypt.hash('Password1', 10), role: 'user' },
		{ username: 'testuser2', password: await bcrypt.hash('Password2', 10), role: 'user' }
	];
	await db.User.bulkCreate(testData);
};

describe('User Controller', () => {
	beforeEach(async () => {
		await db.User.destroy({ where: {} });
		await seedUser();
	});
	

	describe('registerUser', () => {
		it('should register a new user', async () => {
			const userData = { username: 'newuser', password: 'password', role: 'user' };
			const res = await request(app).post('/register').send(userData);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.username, 'newuser');
			assert.strictEqual(res.body.role, 'user');
			assert.strictEqual(res.body.password, undefined);
		});

		it('should return error if username already exists', async () => {
			const userData = { username: 'testuser1', password: 'password', role: 'user' };
			const res = await request(app).post('/register').send(userData);

			assert.strictEqual(res.status, 400);
			assert.strictEqual(res.body.error, 'Username already exists');
		});
	});

	describe('loginUser', () => {
		it('should login a user with correct credentials', async () => {
			const loginData = { username: 'testuser1', password: 'Password1' };
			const res = await request(app).post('/login').send(loginData);
			
			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.token !== undefined, true);
			userId = res.body.userId;
		});

		it('should return error for login with incorrect password', async () => {
			const loginData = { username: 'testuser1', password: 'wrongpassword' };
			const res = await request(app).post('/login').send(loginData);

			assert.strictEqual(res.status, 401);
			assert.strictEqual(res.body.error, 'Invalid credentials');
		});

		it('should return error for login with non-existing user', async () => {
			const loginData = { username: 'nonexistinguser', password: 'password' };
			const res = await request(app).post('/login').send(loginData);

			assert.strictEqual(res.status, 404);
			assert.strictEqual(res.body.error, 'User not found');
		});
	});

	describe('getUserDetails', () => {
		it('should get user details for authenticated user', async () => {
			const user = await db.User.findOne({ where: { username: 'testuser1' } });
			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

			const res = await request(app)
			.get('/user-details')
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.username, 'testuser1');
			assert.strictEqual(res.body.role, 'user');
			assert.strictEqual(res.body.password, undefined);
		});

	});
});

module.exports = { seedUser };
