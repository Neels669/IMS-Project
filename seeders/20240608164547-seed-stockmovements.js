'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the initial product data
    const products = await queryInterface.sequelize.query(
      `SELECT id, quantity FROM Products;`
    );

    const productData = products[0];
    const stockMovements = [];

    // Reflecting initial orders in stock movements
    const orders = [
      { productId: 1, categoryId: 1, change: -10 }, // Order 1 affects Bubble Gum
      { productId: 2, categoryId: 2, change: -20 }  // Order 2 affects Candy Cane
    ];

    orders.forEach(order => {
      const product = productData.find(p => p.id === order.productId);
      if (product) {
        product.quantity += order.change;
        stockMovements.push({
          productId: product.id,
          categoryId: order.categoryId,
          change: order.change,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('StockMovements', stockMovements);

    // Update product quantities
    await Promise.all(
      productData.map(product =>
        queryInterface.bulkUpdate('Products', { quantity: product.quantity }, { id: product.id })
      )
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('StockMovements', null, {});
  }
};
