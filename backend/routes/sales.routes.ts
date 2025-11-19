import express from 'express';
import {createSale, generateBill, getAllSales, getDailySales, getMonthlySales} from '../controller/sales.controller';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-sale',protect,createSale);
router.get('/daily',protect, getDailySales);
router.get('/:id/bill',protect, generateBill);
router.get('/monthly-report',protect, getMonthlySales);
router.get('/get-all',protect, getAllSales);

export default router;