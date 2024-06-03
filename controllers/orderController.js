const db = require('../models');

// Controller functions for orders
const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await db.Order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await db.Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrder: async (req, res) => {
    const { userId, status, total, orderItems } = req.body;
    if (!userId || !status || !total) {
      return res.status(400).json({ error: 'Invalid order data' });
    }
    try {
      const order = await db.Order.create({ userId, status, total });
      if (orderItems && orderItems.length > 0) {
        for (const item of orderItems) {
	   await db.OrderItem.create({
	     orderId: order.id,
	     productId: item.productId,
	     quantity: item.quantity,
	     price: item.price
	   });
	}
      }
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    const orderId = req.params.id;
    const { status, total, orderItems } = req.body;
    try {
      const order = await db.Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      await order.update({ status, total });
      if (orderItems && orderItems.length > 0) {
        for (const item of orderItems) {
	  await db.OrderItem.update(
	    {
              quantity: item.quantity,
	      price: item.price
	    },
	    {
	      where: { orderId: order.id, productId: item.productId }
	    }
	  );
	}
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    const orderId = req.params.id;
    try {
      const order = await db.Order.findByPk(orderId);
      if (!order) {
	return res.status(404).json({ error: 'Order not found' });
      }
      await order.destroy();
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orderController;
