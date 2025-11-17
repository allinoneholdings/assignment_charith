import express from 'express';
import { addItem, getItems, getItemById, updateItem, getLowStockItems } from '../controller/item.controller';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', protect, addItem);
router.get('/get-all', protect, getItems);
router.get('/get-by-id/:id', protect, getItemById);
router.put('/update-item/:id', protect, updateItem);
router.get('/low-stock', protect, getLowStockItems);

export default router;