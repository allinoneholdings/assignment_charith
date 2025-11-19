import express from 'express';
import {addItem, getItems, getItemById, updateItem, getLowStockItems, deleteItem} from '../controller/item.controller';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', addItem);
router.get('/get-all',protect, getItems);
router.get('/get-by-id/:id', protect, getItemById);
router.put('/update-item/:id', updateItem);
router.get('/low-stock', protect, getLowStockItems);
router.delete('/delete/:id', protect, deleteItem);

export default router;