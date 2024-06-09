const { Category } = require('../models');

async function createCategory() {
  const inquirer = (await import('inquirer')).default;
  const answers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter category name (or type "back" to return):' }
  ]);

  if (answers.name.toLowerCase() === 'back') return;

  await Category.create({
    name: answers.name
  });

  console.log('Category created successfully!');
}

async function listCategories() {
  const categories = await Category.findAll();
  console.log(categories.map(c => c.toJSON()));
}

async function editCategory() {
  const inquirer = (await import('inquirer')).default;
  const categories = await Category.findAll();
  const categoryChoices = categories.map(category => ({ name: category.name, value: category.id }));

  const answers = await inquirer.prompt([
    { type: 'list', name: 'id', message: 'Select category to edit (or type "back" to return):', choices: [...categoryChoices, { name: 'back', value: 'back' }] }
  ]);

  if (answers.id === 'back') return;

  const editAnswers = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Enter new category name:' }
  ]);

  await Category.update(
    { name: editAnswers.name },
    { where: { id: parseInt(answers.id) } }
  );

  console.log('Category updated successfully!');
}

async function deleteCategory() {
  const inquirer = (await import('inquirer')).default;
  const categories = await Category.findAll();
  const categoryChoices = categories.map(category => ({ name: category.name, value: category.id }));

  const answers = await inquirer.prompt([
    { type: 'list', name: 'id', message: 'Select category to delete (or type "back" to return):', choices: [...categoryChoices, { name: 'back', value: 'back' }] }
  ]);

  if (answers.id === 'back') return;

  await Category.destroy({ where: { id: parseInt(answers.id) } });
  console.log('Category deleted successfully!');
}

module.exports = { createCategory, listCategories, editCategory, deleteCategory };
