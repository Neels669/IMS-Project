const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('User Controller', () => {
	let transaction;

	  before(async () => {
		  transaction = await db.sequelize.transaction();
		  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { transaction });
	  });

	after(async () => {
		await transaction.rollback();
		await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
	});

	beforeEach(async () => {
		await db.User.destroy({ truncate: true, force: true, transaction });
	});

	describe('registerUser', () => {
		it('should register a new user', async () => {
			const userData = { username: 'testuser', password: 'password', role: 'user' };
			const res = await request(app).post('/register').send(userData);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.username, 'testuser');
			assert.strictEqual(res.body.role, 'user');
			assert.strictEqual(res.body.password, undefined);
		});

		it('should return error if username already exists', async () => {
			await db.User.create({ username: 'testuser', password: await bcrypt.hash('password', 10), role: 'user' });

			const userData = { username: 'testuser', password: 'password', role: 'user' };
			const res = await request(app).post('/register').send(userData);

			assert.strictEqual(res.status, 400);
			assert.strictEqual(res.body.error, 'Username already exists');
		});
	});

	describe('loginUser', () => {
		it('should login a user with correct credentials', async () => {
			const hashedPassword = await bcrypt.hash('password', 10);
			await db.User.create({ username: 'testuser', password: hashedPassword, role: 'user' });

			const loginData = { username: 'testuser', password: 'password' };
			const res = await request(app).post('/login').send(loginData);
			
			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.token !== undefined, true);
		});

		it('should return error for login with incorrect password', async () => {
			const hashedPassword = await bcrypt.hash('password', 10);
			await db.User.create({ username: 'testuser', password: hashedPassword, role: 'user' });

			const loginData = { username: 'testuser', password: 'wrongpassword' };
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
			const user = await db.User.create({ username: 'testuser', password: 'password', role: 'user' });

			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

			const res = await request(app)
			.get('/user-details')
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.username, 'testuser');
			assert.strictEqual(res.body.role, 'user');
			assert.strictEqual(res.body.password, undefined);
		});
	});
});
