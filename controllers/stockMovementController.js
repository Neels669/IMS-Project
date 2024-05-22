const db = require('../models');

// Controller functions for stock movements
const stockMovementController = {
  getAllStockMovements: async (req, res) => {
    try {
      const stockMovements = await db.StockMovement.findAll();
      res.json(stockMovements);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStockMovementById: async (req, res) => {
    try {
      const stockMovement = await db.StockMovement.findByPk(req.params.id);
      if (!stockMovement) {
        return res.status(404).json({ error: 'Stock movement not found' });
      }
      res.json(stockMovement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createStockMovement: async (req, res) => {
    try {
      const newStockMovement = await db.StockMovement.create(req.body);
      res.status(201).json(newStockMovement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateStockMovement: async (req, res) => {
    try {
      const updatedStockMovement = await db.StockMovement.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedStockMovement[0] === 0) {
        return res.status(404).json({ error: 'Stock movement not found' });
      }
      res.json({ message: 'Stock movement updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteStockMovement: async (req, res) => {
    try {
      const deletedStockMovement = await db.StockMovement.destroy({
        where: { id: req.params.id }
      });
      if (!deletedStockMovement) {
        return res.status(404).json({ error: 'Stock movement not found' });
      }
      res.json({ message: 'Stock movement deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = stockMovementController;
