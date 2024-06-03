require('dotenv').config();
const { sequelize } = require('../models');

before(async () => {
	try {
		await dropAllTables();
		await sequelize.sync({ force: true });
	} catch (error) {
		console.error('Error during global setup:', error);
	}
});

beforeEach(async () => {
	try {
		await dropAllTables();
		await sequelize.sync({ force: true });
	} catch (error) {
		console.error('Error during test setup:', error);
	}
});

after(async () => {
	try {
		await sequelize.close();
	} catch (error) {
		console.error('Error during global teardown:', error);
	}
});

async function dropAllTables() {
	const queryInterface = sequelize.getQueryInterface();

	try {
		await queryInterface.dropTable('StockMovements', { force: true });
		await queryInterface.dropTable('OrderItems', { force: true });
		await queryInterface.dropTable('Orders', { force: true });
		await queryInterface.dropTable('Users', { force: true });
		await queryInterface.dropTable('Products', { force: true });
		await queryInterface.dropTable('Categories', { force: true });
	} catch (error) {
		console.error('Error dropping tables:', error);
	}
}
