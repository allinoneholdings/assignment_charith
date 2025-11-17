import express from 'express';
import { createSale, getDailySales } from '../controller/sales.controller';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-sale', protect, createSale);
router.get('/daily',protect, getDailySales);

export default router;