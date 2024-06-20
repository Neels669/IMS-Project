const { StockMovement, Product, Category } = require('../models');
const Table = require('cli-table');

async function listStockMovements() {
  const inquirer = (await import('inquirer')).default;
  const stockMovements = await StockMovement.findAll({ include: [Product, Category] });
  
  // Create a table instance
  const table = new Table({
    head: ['ID', 'Product Name', 'Category Name', 'Change', 'Date'],
    colWidths: [5, 20, 20, 10, 25]
  });

  // Add rows to the table
  stockMovements.forEach(movement => {
    table.push([
      movement.id,
      movement.Product.name,
      movement.Category.name,
      movement.change,
      movement.createdAt.toISOString()
    ]);
  });

  // Print the table
  console.log(table.toString());
}

module.exports = { listStockMovements };
