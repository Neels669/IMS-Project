const db = require('../models');

// Controller functions for handling CRUD operations on categories
const categoryController = {
  // Get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await db.Category.findAll();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },

  // Get category by ID
  getCategoryById: async (req, res) => {
    const categoryId = req.params.id;
    try {
      const category = await db.Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  },

  // Create a new category
  createCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const newCategory = await db.Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  },

  // Update an existing category
  updateCategory: async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    try {
      const category = await db.Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await category.update({ name });
      res.json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  },

  // Delete a category
  deleteCategory: async (req, res) => {
    const categoryId = req.params.id;
    try {
      const category = await db.Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await category.destroy();
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
};

module.exports = categoryController;
