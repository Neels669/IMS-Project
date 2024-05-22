'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      { id: 1, name: 'Bubble Gums', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Candies', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Chocolates', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Lollipops', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Toffees', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};

