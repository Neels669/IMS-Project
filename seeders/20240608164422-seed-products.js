'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      { id: 1, name: 'Bubble Gum', description: 'Chewing bubble gum', quantity: 100, price: 0.50, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Candy Cane', description: 'Sweet candy cane', quantity: 200, price: 1.00, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Chocolate Bar', description: 'Milk chocolate bar', quantity: 150, price: 1.50, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Lollipop', description: 'Fruit flavored lollipop', quantity: 250, price: 0.75, categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Toffee', description: 'Chewy toffee', quantity: 300, price: 0.25, categoryId: 5, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
