const { Product, Category } = require('../models');

async function createProduct() {
  const inquirer = (await import('inquirer')).default;
  const categories = await Category.findAll();
  const categoryChoices = categories.map(category => ({ name: category.name, value: category.id }));

  const answers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter product name (or type "back" to return):' },
    { type: 'input', name: 'description', message: 'Enter product description:' },
    { type: 'input', name: 'quantity', message: 'Enter product quantity:' },
    { type: 'input', name: 'price', message: 'Enter product price:' },
    { type: 'list', name: 'categoryId', message: 'Select product category:', choices: categoryChoices }
  ]);

  if (answers.name.toLowerCase() === 'back') return;

  await Product.create({
    name: answers.name,
    description: answers.description,
    quantity: parseInt(answers.quantity),
    price: parseFloat(answers.price),
    categoryId: answers.categoryId
  });

  console.log('Product created successfully!');
}

async function listProducts() {
  const products = await Product.findAll({ include: Category });
  console.log(products.map(p => p.toJSON()));
}

async function editProduct() {
  const inquirer = (await import('inquirer')).default;
  const products = await Product.findAll();
  const productChoices = products.map(product => ({ name: product.name, value: product.id }));

  const categories = await Category.findAll();
  const categoryChoices = categories.map(category => ({ name: category.name, value: category.id }));

  const answers = await inquirer.prompt([
    { type: 'list', name: 'id', message: 'Select product to edit (or type "back" to return):', choices: [...productChoices, { name: 'back', value: 'back' }] }
  ]);

  if (answers.id === 'back') return;

  const editAnswers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter new product name:' },
    { type: 'input', name: 'description', message: 'Enter new product description:' },
    { type: 'input', name: 'quantity', message: 'Enter new product quantity:' },
    { type: 'input', name: 'price', message: 'Enter new product price:' },
    { type: 'list', name: 'categoryId', message: 'Select new product category:', choices: categoryChoices }
  ]);

  await Product.update(
    { 
      name: editAnswers.name, 
      description: editAnswers.description,
      quantity: parseInt(editAnswers.quantity),
      price: parseFloat(editAnswers.price),
      categoryId: editAnswers.categoryId 
    },
    { where: { id: parseInt(answers.id) } }
  );

  console.log('Product updated successfully!');
}

async function deleteProduct() {
  const inquirer = (await import('inquirer')).default;
  const products = await Product.findAll();
  const productChoices = products.map(product => ({ name: product.name, value: product.id }));

  const answers = await inquirer.prompt([
    { type: 'list', name: 'id', message: 'Select product to delete (or type "back" to return):', choices: [...productChoices, { name: 'back', value: 'back' }] }
  ]);

  if (answers.id === 'back') return;

  await Product.destroy({ where: { id: parseInt(answers.id) } });
  console.log('Product deleted successfully!');
}

module.exports = { createProduct, listProducts, editProduct, deleteProduct };
