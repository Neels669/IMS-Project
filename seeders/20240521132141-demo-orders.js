'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      { id: 1, userId: 1, status: 'pending', total: 100.00, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, userId: 2, status: 'completed', total: 30.00, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};

