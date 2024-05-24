const http = require('http');
const assert = require('assert');
const app = require('../index');

const { sequelize } = require('../models');

let server;

before(function (done) {
	this.timeout(30000);
	server = http.createServer(app);
	server.listen(3000, (err) => {
		if (err) return done(err);
		sequelize.sync({ force: true }).then(() => done()).catch(done);
	});
});

after((done) => {
	if (server) {
		server.close(done);
	} else {
		done();
	}
});

describe('Product Controller', () => {
	describe('GET /products', () => {
		it('should get all products', (done) => {
			const options = {
				hostname: 'localhost',
				port: 3000,
				path: '/products',
				method: 'GET',
			};

			const req = http.request(options, (res) => {
				let data = '';

				res.on('data', (chunk) => {
					data += chunk;
				});

				res.on('end', () => {
					assert.strictEqual(res.statusCode, 200);
					assert.doesNotThrow(() => JSON.parse(data));
					done();
				});
			});

			req.on('error', (err) => {
				done(err);
			});

			req.end();
		});
	});

	describe('POST /products', () => {
		it('should create a new product', (done) => {
			const product = {
				name: 'New Product',
				sku: 'NP12345',
				description: 'This is a new product.',
				price: 99.99,
				stock: 100,
				categoryId: 1,
			};

		const postData = JSON.stringify(product);

		const options = {
			hostname: 'localhost',
			port: 3000,
			path: '/products',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': postData.length,
				}
			};

			const req = http.request(options, (res) => {
				let data = '';

				res.on('data', (chunk) => {
					 data += chunk;
				});

				res.on('end', () => {
					assert.strictEqual(res.statusCode, 201);
					const responseBody = JSON.parse(data);
					assert.strictEqual(responseBody.name, 'New Product');
					done();
				});
			});

			req.on('error', (err) => {
				done(err);
			});

			req.write(postData);
			req.end();
		});
	});
});
