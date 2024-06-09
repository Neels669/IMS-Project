const { Order, Product, StockMovement, User, Category } = require('../models');

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
  const inquirer = (await import('inquirer')).default;
  const orders = await Order.findAll({ include: [Product, User] });
  console.log(orders.map(order => order.toJSON()));
}

module.exports = { createOrder, listOrders };
