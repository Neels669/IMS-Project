'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      { id: 1, userId: 1, productId: 1, quantity: 10, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, userId: 2, productId: 2, quantity: 20, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
