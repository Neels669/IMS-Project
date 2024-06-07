import express from 'express';
import stockMovementController from '../controllers/stockMovementController.js';

const router = express.Router();

router.get('/', stockMovementController.getAllStockMovements);
router.get('/:id', stockMovementController.getStockMovementById);
router.post('/', stockMovementController.createStockMovement);
router.put('/:id', stockMovementController.updateStockMovement);
router.delete('/:id', stockMovementController.deleteStockMovement);

export default router;
