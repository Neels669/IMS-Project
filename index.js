const { login } = require('./controllers/authController');
const { mainMenu } = require('./controllers/menu');

async function startCLI() {
  console.log("Welcome to the Inventory Management System!");
  await login();
  await mainMenu();
}

startCLI();
