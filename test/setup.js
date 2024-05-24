require('dotenv').config();
const { sequelize } = require('../models');

before(async () => {
	await dropAllTables();
	await sequelize.sync({ force: true });
});

beforeEach(async () => {
	await dropAllTables();
	await sequelize.sync({ force: true });
});

after(async () => {
	 await sequelize.close();
});

async function dropAllTables() {
	const { sequelize } = require('../models');
	const queryInterface = sequelize.getQueryInterface();

	await queryInterface.dropTable('StockMovements', { force: true });
	await queryInterface.dropTable('OrderItems', { force: true });
	await queryInterface.dropTable('Orders', { force: true });
	await queryInterface.dropTable('Users', { force: true });
	await queryInterface.dropTable('Products', { force: true });
	await queryInterface.dropTable('Categories', { force: true });
}
