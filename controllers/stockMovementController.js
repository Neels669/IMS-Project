const { StockMovement, Product, Category } = require('../models');

async function listStockMovements() {
  const inquirer = (await import('inquirer')).default;
  const stockMovements = await StockMovement.findAll({ include: [Product, Category] });
  console.log(stockMovements.map(sm => sm.toJSON()));
}

module.exports = { listStockMovements };
