const assert = require('assert');
const request = require('supertest');
const app = require('../index');
const { Order, User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const seedUser = async () => {
	const testData = [
		{ username: 'testuser1', password: await bcrypt.hash('Password1', 10), role: 'user' },
		{ username: 'testuser2', password: await bcrypt.hash('Password2', 10), role: 'user' }
	];
	await User.bulkCreate(testData);
};


const seedOrder = async () => {
	const user = await User.findOne({ where: { username: 'testuser1' } });
	if (!user) {
		throw new Error('User not found. Ensure users are seeded before orders.');		
	}
	const testData = [
		{ userId: user.id, status: 'Pending', total: '100.00' },
		{ userId: user.id, status: 'Completed', total: '200.00' },
		{ userId: user.id, status: 'Pending', total: '150.00' }
	];
	await Order.bulkCreate(testData);
};

describe('Order Controller', () => {
	let token;
	let userId;

	before(async () => {
		await User.destroy({ where: {} });
		await seedUser();
		const user = await User.findOne({ where: { username: 'testuser1' } });
		if (!user) {
			throw new Error('User not found. Ensure users are seeded before tests.');
		}
		userId = user.id;
		token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
	});

	beforeEach(async () => {
		await Order.destroy({ where: {} });
		await User.destroy({ where: {} });
		await seedUser();
		await seedOrder();
	});

	describe('GET /orders', () => {
		it('should return all orders', async () => {
			const res = await request(app)
			.get('/orders')
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.length, 3);
		});
	});

	describe('GET /orders/:id', () => {
		it('should return an order by ID', async () => {
			const order = await Order.create({ userId, status: 'Test Order', total: '15.00' });

			const res = await request(app)
			.get(`/orders/${order.id}`)
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.status, 'Test Order');
			assert.strictEqual(parseFloat(res.body.total).toFixed(2), '15.00');
		});

		it('should return 404 for non-existing order', async () => {
			const res = await request(app)
			.get('/orders/999')
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 404);
			assert.strictEqual(res.body.error, 'Order not found');
		});
	});


	describe('POST /orders', () => {
		it('should create a new order', async () => {
			const orderData = { userId, status: 'New Order', total: '25.00' };

			const res = await request(app)
			.post('/orders')
			.send(orderData)
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 201);
			assert.strictEqual(res.body.userId, userId);
			assert.strictEqual(res.body.status, 'New Order');
			assert.strictEqual(parseFloat(res.body.total).toFixed(2), '25.00');
		});

		it('should return 400 if the order data is invalid', async () => {
			const res = await request(app)
			.post('/orders')
			.send({ status: 'New Order' })
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 400);
		});
	});

	describe('PUT /orders/:id', () => {
		it('should update an existing order', async () => {
			const order = await Order.create({ userId, status: 'Test Order', total: '15.00' });
			
			const updateData = { status: 'Updated Order', total: '20.00' };

			const res = await request(app)
			.put(`/orders/${order.id}`)
			.send(updateData)
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.status, 'Updated Order');
			assert.strictEqual(parseFloat(res.body.total).toFixed(2), '20.00');
		});

		it('should return 404 for updating non-existing order', async () => {
			const updateData = { status: 'Updated Order', total: '20.00' };

			const res = await request(app)
			.put('/orders/999')
			.send(updateData)
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 404);
			assert.strictEqual(res.body.error, 'Order not found');
		});
	});

	describe('DELETE /orders/:id', () => {
		it('should delete an existing order', async () => {
			const order = await Order.create({ userId, status: 'Test Order', total: '15.00' });

			const res = await request(app)
			.delete(`/orders/${order.id}`)
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 200);
			assert.strictEqual(res.body.message, 'Order deleted successfully');
		});

		it('should return 404 for deleting non-existing order', async () => {
			const res = await request(app)
			.delete('/orders/999')
			.set('Authorization', `Bearer ${token}`);

			assert.strictEqual(res.status, 404);
			assert.strictEqual(res.body.error, 'Order not found');
		});
	});
});
module.exports = { seedOrder };
