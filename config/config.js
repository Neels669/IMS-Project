require('dotenv').config();

const environments = {
	development: {
		username: process.env.DEV_DB_USER || 'mysql_username',
		password: process.env.DEV_DB_PASSWORD || 'root',
		database: process.env.DEV_DB_NAME || 'inventory_management_system',
		host: process.env.DEV_DB_HOST || 'localhost',
		dialect: 'mysql',
	},
	test: {
		username: process.env.TEST_DB_USER || 'test_user',
		password: process.env.TEST_DB_PASSWORD || 'test_password',
		database: process.env.TEST_DB_NAME || 'inventory_management_system_test',
		host: process.env.TEST_DB_HOST || 'localhost',
		dialect: 'mysql',
	},
	production: {
		username: process.env.PROD_DB_USER || 'prod_user',
		password: process.env.PROD_DB_PASSWORD || 'prod_password',
		database: process.env.PROD_DB_NAME || 'inventory_management_system_production',
		host: process.env.PROD_DB_HOST || 'localhost',
		dialect: 'mysql',
	}
};

const currentEnv = process.env.NODE_ENV || 'development';

module.exports = environments[currentEnv];
