'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { id: 1, username: 'admin', password: 'admin123', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, username: 'testuser', password: 'test123', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
