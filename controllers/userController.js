const { User } = require('../models');
const Table = require('cli-table');

async function createUser() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'input', name: 'username', message: 'Enter username (or type "back" to return):' },
    { type: 'password', name: 'password', message: 'Enter password:' }
  ]);

  if (answers.username.toLowerCase() === 'back') return;

  await User.create({
    username: answers.username,
    password: answers.password
  });

  console.log('User created successfully!');
}

async function listUsers() {
  const users = await User.findAll();
  
  // Create a table instance
  const table = new Table({
    head: ['ID', 'Username', 'Created At', 'Updated At'],
    colWidths: [5, 20, 25, 25]
  });

  // Add rows to the table
  users.forEach(user => {
    const createdAt = user.createdAt.toISOString().split('T')[0];
    const updatedAt = user.updatedAt.toISOString().split('T')[0];
    table.push([
      user.id,
      user.username,
      createdAt,
      updatedAt
    ]);
  });

  // Print the table
  console.log(table.toString());
}

async function editUser() {
  const inquirer = (await import('inquirer')).default;
  const users = await User.findAll();
  const userChoices = users.map(user => ({ name: user.username, value: user.id }));

  const answers = await inquirer.prompt([
    { type: 'list', name: 'id', message: 'Select user to edit (or type "back" to return):', choices: [...userChoices, { name: 'back', value: 'back' }] }
  ]);

  if (answers.id === 'back') return;

  const editAnswers = await inquirer.prompt([
    { type: 'input', name: 'username', message: 'Enter new username:' },
    { type: 'password', name: 'password', message: 'Enter new password:' }
  ]);

  await User.update(
    { 
      username: editAnswers.username, 
      password: editAnswers.password 
    },
    { where: { id: parseInt(answers.id) } }
  );

  console.log('User updated successfully!');
}

async function deleteUser() {
  const inquirer = (await import('inquirer')).default;
  const users = await User.findAll();
  const userChoices = users.map(user => ({ name: user.username, value: user.id }));

  const answers = await inquirer.prompt([
    { type: 'list', name: 'id', message: 'Select user to delete (or type "back" to return):', choices: [...userChoices, { name: 'back', value: 'back' }] }
  ]);

  if (answers.id === 'back') return;

  await User.destroy({ where: { id: parseInt(answers.id) } });
  console.log('User deleted successfully!');
}

module.exports = { createUser, listUsers, editUser, deleteUser };
