const { User } = require('../models');

async function login() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'input', name: 'username', message: 'Enter username:' },
    { type: 'password', name: 'password', message: 'Enter password:' }
  ]);

  const user = await User.findOne({ where: { username: answers.username, password: answers.password } });
  if (user) {
    console.log('Login successful!');
  } else {
    console.log('Login failed. Please try again.');
    await login();
  }
}

module.exports = { login };
