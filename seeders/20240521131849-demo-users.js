'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { id: 1, username: 'Admin', password: 'admin', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, username: 'User', password: 'user', role: 'user', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

