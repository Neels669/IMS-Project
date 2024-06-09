const { createProduct, listProducts, editProduct, deleteProduct } = require('./productController');
const { createCategory, listCategories, editCategory, deleteCategory } = require('./categoryController');
const { createOrder, listOrders } = require('./orderController');
const { listStockMovements } = require('./stockMovementController');
const { createUser, listUsers, editUser, deleteUser } = require('./userController');
const { login } = require('./authController');

async function mainMenu() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'list', name: 'action', message: 'Choose an action:', choices: ['Manage Products', 'Manage Categories', 'Manage Orders', 'Manage Users', 'Manage Stock Movements', 'Exit'] }
  ]);

  switch (answers.action) {
    case 'Manage Products':
      await manageProducts();
      break;
    case 'Manage Categories':
      await manageCategories();
      break;
    case 'Manage Orders':
      await manageOrders();
      break;
    case 'Manage Users':
      await manageUsers();
      break;
    case 'Manage Stock Movements':
      await listStockMovements();
      break;
    case 'Exit':
      console.log("Goodbye!");
      process.exit();
      break;
  }

  await mainMenu();
}

async function manageProducts() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'list', name: 'action', message: 'Choose an action:', choices: ['Create Product', 'List Products', 'Edit Product', 'Delete Product', 'Back'] }
  ]);

  switch (answers.action) {
    case 'Create Product':
      await createProduct();
      break;
    case 'List Products':
      await listProducts();
      break;
    case 'Edit Product':
      await editProduct();
      break;
    case 'Delete Product':
      await deleteProduct();
      break;
    case 'Back':
      return;
  }

  await manageProducts();
}

async function manageCategories() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'list', name: 'action', message: 'Choose an action:', choices: ['Create Category', 'List Categories', 'Edit Category', 'Delete Category', 'Back'] }
  ]);

  switch (answers.action) {
    case 'Create Category':
      await createCategory();
      break;
    case 'List Categories':
      await listCategories();
      break;
    case 'Edit Category':
      await editCategory();
      break;
    case 'Delete Category':
      await deleteCategory();
      break;
    case 'Back':
      return;
  }

  await manageCategories();
}

async function manageOrders() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'list', name: 'action', message: 'Choose an action:', choices: ['Create Order', 'List Orders', 'Back'] }
  ]);

  switch (answers.action) {
    case 'Create Order':
      await createOrder();
      break;
    case 'List Orders':
      await listOrders();
      break;
    case 'Back':
      return;
  }

  await manageOrders();
}

async function manageUsers() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'list', name: 'action', message: 'Choose an action:', choices: ['Create User', 'List Users', 'Edit User', 'Delete User', 'Back'] }
  ]);

  switch (answers.action) {
    case 'Create User':
      await createUser();
      break;
    case 'List Users':
      await listUsers();
      break;
    case 'Edit User':
      await editUser();
      break;
    case 'Delete User':
      await deleteUser();
      break;
    case 'Back':
      return;
  }

  await manageUsers();
}

module.exports = { mainMenu };
