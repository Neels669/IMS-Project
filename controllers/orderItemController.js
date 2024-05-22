const db = require('../models');

// Controller functions for order items
const orderItemController = {
  getAllOrderItems: async (req, res) => {
    try {
      const orderItems = await db.OrderItem.findAll();
      res.json(orderItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderItemById: async (req, res) => {
    try {
      const orderItem = await db.OrderItem.findByPk(req.params.id);
      if (!orderItem) {
        return res.status(404).json({ error: 'Order item not found' });
      }
      res.json(orderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrderItem: async (req, res) => {
    try {
      const newOrderItem = await db.OrderItem.create(req.body);
      res.status(201).json(newOrderItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateOrderItem: async (req, res) => {
    try {
      const updatedOrderItem = await db.OrderItem.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedOrderItem[0] === 0) {
        return res.status(404).json({ error: 'Order item not found' });
      }
      res.json({ message: 'Order item updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteOrderItem: async (req, res) => {
    try {
      const deletedOrderItem = await db.OrderItem.destroy({
        where: { id: req.params.id }
      });
      if (!deletedOrderItem) {
        return res.status(404).json({ error: 'Order item not found' });
      }
      res.json({ message: 'Order item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orderItemController;
