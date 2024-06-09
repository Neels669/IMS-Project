const { User } = require('../models');

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
  console.log(users.map(user => user.toJSON()));
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
