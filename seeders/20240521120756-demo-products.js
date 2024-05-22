'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed products data
    return queryInterface.bulkInsert('Products', [
      { id: 1, name: 'Fresh Peppermint Gum', sku: 'BBG001', description: 'Peppermint flavour, 50 pieces Bubblegums', price: 10.99, stock: 100, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Ice Menthol gum', sku: 'BBG002', description: 'Menthol flavour, 50 pieces Bubblegums', price: 11.99, stock: 80, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Fantasy Fruit gum', sku: 'BBG003', description: 'Mixed Fruit flavour, 50 pieces Bubblegum', price: 10.99, stock: 200, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Power Cinnamon', sku: 'BBG004', description: 'Cinnamon flavour, 50 pieces Bubblegum', price: 11.99, stock: 100, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Sour patch candies', sku: 'CDY001', description: 'Sour fruits flavour, 500 grams', price: 9, stock: 100, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Skittles Candies', sku: 'CDY002', description: 'Fruit flavout chewable candies, 500 grams', price: 7, stock: 100, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Milky Mow Candies', sku: 'CDY003', description: 'Milk flavour chewable candies, 500 grams', price: 8, stock: 100, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Cola Jellys', sku: 'CDY004', description: 'Cola flavour Jellys, 700 grams', price: 10.99, stock: 100, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Peppermint Drops', sku: 'CDY005', description: 'Peppermint flavour hard boiled candy, 600 grams', price: 10.99, stock: 100, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Snippers', sku: 'CHC001', description: 'Chocolate bar consisting of nougat topped with caramel and peanuts.', price: 15, stock: 100, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Dib Dab', sku: 'CHC002', description: 'Chocolate-covered wafer bar', price: 13.50, stock: 100, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Fairy Milk', sku: 'CHC003', description: 'Milk Chocolate Bar.', price: 13, stock: 80, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Dads Dark Chocolate', sku: 'CHC004', description: 'Dark Chocolate Bar', price: 11, stock: 80, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'The Milky Way', sku: 'CHC005', description: 'White Chocolate Bar', price: 13.99, stock: 70, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Big Kiss Pops', sku: 'LLP001', description: 'Large assorted flavour lollipops, mixed flavour, 30 pieces pack', price: 18, stock: 100, categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'Whirly Pops', sku: 'LLP002', description: 'Whirly shaped lollipops, fruit flavour, 30 pieces pack', price: 14, stock: 50, categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'Choco Pops', sku: 'LLP003', description: 'Chocolate flavour lollipops, 30 pieces pack', price: 14, stock: 100, categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 18, name: 'Party mini pops', sku: 'LLP004', description: 'Mini lollipops, fruits flavour, 60 pieces pack', price: 18, stock: 100, categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 19, name: 'Butterscotch Toffee', sku: 'TOF001', description: 'Butterscoth flavour toffees, 80 pieces pack', price: 10, stock: 90, categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Caramella Toffee', sku: 'TOF002', description: 'Caramella flavour toffees, 80 pieces pack', price: 10, stock: 90, categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 21, name: 'Youghurt Toffee', sku: 'TOF003', description: 'Youghurt flavour toffees, 80 pieces pack', price: 10, stock: 90, categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Chococream Toffee', sku: 'TOF004', description: 'Chcoclate flavour toffees, 80 pieces pack', price: 10, stock: 90, categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'Milk Toffee', sku: 'TOF005', description: 'Milk flavour toffees, 80 pieces pack', price: 10, stock: 80, categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};

