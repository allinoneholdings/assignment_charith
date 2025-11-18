import express from 'express';
import {createSale, generateBill, getDailySales, getMonthlySales} from '../controller/sales.controller';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-sale',protect,createSale);
router.get('/daily', getDailySales);
router.get('/:id/bill', generateBill);
router.get('/monthly-bill', getMonthlySales);

export default router;