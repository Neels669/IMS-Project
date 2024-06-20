const { Order, Product, StockMovement, User, Category } = require('../models');
const Table = require('cli-table');

async function createOrder() {
  const inquirer = (await import('inquirer')).default;
  const products = await Product.findAll();
  const productChoices = products.map(product => ({ name: `${product.name} (Stock: ${product.quantity})`, value: product.id }));

  const users = await User.findAll();
  const userChoices = users.map(user => ({ name: user.username, value: user.id }));

  const answers = await inquirer.prompt([
    { type: 'list', name: 'productId', message: 'Select product:', choices: productChoices },
    { type: 'input', name: 'quantity', message: 'Enter quantity:' },
    { type: 'list', name: 'userId', message: 'Select user:', choices: userChoices }
  ]);

  const product = await Product.findByPk(answers.productId);

  if (product.quantity < parseInt(answers.quantity)) {
    console.log('Insufficient stock!');
    return;
  }

  await Order.create({
    userId: parseInt(answers.userId),
    productId: parseInt(answers.productId),
    quantity: parseInt(answers.quantity)
  });

  // Update product stock
  product.quantity -= parseInt(answers.quantity);
  await product.save();

  // Record stock movement
  await StockMovement.create({
    productId: product.id,
    categoryId: product.categoryId,
    change: -parseInt(answers.quantity)
  });

  console.log('Order created and stock updated successfully!');
}

async function listOrders() {
  const orders = await Order.findAll({ include: [Product, User] });

  // Create a table instance
  const table = new Table({
    head: ['ID', 'Product Name', 'Quantity', 'Price', 'Total Value', 'User Name', 'Date', 'Time'],
    colWidths: [5, 20, 10, 10, 15, 20, 15, 10]
  });

  // Add rows to the table
  orders.forEach(order => {
    const price = order.Product.price;
    const totalValue = order.quantity * price;
    const date = order.createdAt.toISOString().split('T')[0];
    const time = order.createdAt.toISOString().split('T')[1].split('.')[0];
    table.push([
      order.id,
      order.Product.name,
      order.quantity,
      price.toFixed(2),
      totalValue.toFixed(2),
      order.User ? order.User.username : 'Unknown',
      date,
      time
    ]);
  });

  // Print the table
  console.log(table.toString());
}

module.exports = { createOrder, listOrders };
