const express = require('express');
const router = express.Router();
const stockMovementController = require('../controllers/stockMovementController');

// Routes for stock movements
router.get('/', stockMovementController.getAllStockMovements);
router.get('/:id', stockMovementController.getStockMovementById);
router.post('/', stockMovementController.createStockMovement);
router.put('/:id', stockMovementController.updateStockMovement);
router.delete('/:id', stockMovementController.deleteStockMovement);

module.exports = router;
