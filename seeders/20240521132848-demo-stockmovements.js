'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StockMovements', [
      { productId: 1, quantity: 50, type: 'restock', createdAt: new Date(), updatedAt: new Date() },
      { productId: 2, quantity: -5, type: 'sale', createdAt: new Date(), updatedAt: new Date() },
      // Add more stock movements as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StockMovements', null, {});
  }
};

