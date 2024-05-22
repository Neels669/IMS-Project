'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OrderItems', [
      { orderId: 1, productId: 20, quantity: 1, price: 10.00, createdAt: new Date(), updatedAt: new Date() },
      { orderId: 1, productId: 22, quantity: 2, price: 20.00, createdAt: new Date(), updatedAt: new Date() },
      // Add more order items as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrderItems', null, {});
  }
};

