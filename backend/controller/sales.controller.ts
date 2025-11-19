import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import Sale, { ISale, ISaleItem } from '../models/Sales';
import Item from '../models/Item';
import { IUserRequest } from '../types';
import mongoose from 'mongoose';

export const createSale = async (req: IUserRequest, res: Response) => {
    try {
        const { items } = req.body;
        const soldBy = req.user?._id;

        if (!soldBy) return res.status(401).json({ message: 'Unauthorized access' });

        let totalAmount = 0;
        const saleItems: ISaleItem[] = [];

        for (const i of items) {
            const item = await Item.findOne({ name: i.item });
            if (!item) return res.status(404).json({ message: `Item "${i.item}" not found` });
            if (item.quantity < i.quantity)
                return res.status(400).json({ message: `Not enough stock for ${item.name}` });
            item.quantity -= i.quantity;
            await item.save();
            totalAmount += i.quantity * item.unitPrice;
            saleItems.push({ item: item._id, quantity: i.quantity });
        }
        const sale = await Sale.create({ items: saleItems, totalAmount, soldBy });
        res.status(201).json(sale);

    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
};

export const getDailySales = async (req: Request, res: Response) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const sales = await Sale.find({ createdAt: { $gte: start, $lte: end } })
            .populate('items.item')
            .populate('soldBy');

        const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

        res.json({ totalSales: sales.length, totalRevenue, sales });

    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
}

export const generateBill = async (req: Request, res: Response) => {
    try {
        const saleId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(saleId))
            return res.status(400).json({ message: 'Invalid sale id' });

        const sale = await Sale.findById(saleId)
            .populate('items.item')
            .populate('soldBy');

        if (!sale)
            return res.status(404).json({ message: 'Sale not found' });

        const doc = new PDFDocument({ size: 'A4', margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="bill-${sale._id}.pdf"`
        );

        doc.pipe(res);

        // -------------------------
        // Header Section
        // -------------------------
        doc.fontSize(20).text('INVOICE / BILL', { align: 'center' });
        doc.moveDown(1);

        doc.fontSize(10);
        const soldBy = (sale.soldBy as any) || {};

        doc.text(`Sale ID: ${sale._id}`);
        doc.text(`Date: ${new Date(sale.createdAt).toLocaleString()}`);
        doc.text(`Sold By: ${soldBy.name ?? soldBy.email ?? 'N/A'}`);
        doc.moveDown(1.5);

        // -------------------------
        // Table Header
        // -------------------------
        let y = doc.y;

        doc.fontSize(12).text('Item', 50, y);
        doc.text('Qty', 250, y, { width: 60, align: 'right' });
        doc.text('Unit Price', 330, y, { width: 80, align: 'right' });
        doc.text('Total', 430, y, { width: 80, align: 'right' });

        y += 20;
        doc.moveTo(50, y).lineTo(550, y).stroke();
        y += 15;

        // -------------------------
        // Table Rows
        // -------------------------
        (sale.items as ISaleItem[]).forEach((si) => {
            const item = si.item as any;

            const itemName = item?.name ?? 'Unknown Item';
            const qty = si.quantity;
            const unitPrice = item?.unitPrice ?? 0;
            const total = qty * unitPrice;

            doc.fontSize(10).text(itemName, 50, y);
            doc.text(String(qty), 250, y, { width: 60, align: 'right' });
            doc.text(unitPrice.toFixed(2), 330, y, { width: 80, align: 'right' });
            doc.text(total.toFixed(2), 430, y, { width: 80, align: 'right' });

            y += 20;
        });

        // -------------------------
        // Total Section
        // -------------------------
        doc.moveTo(50, y).lineTo(550, y).stroke();
        y += 15;

        doc.fontSize(12)
            .text('Total Amount:', 330, y, { width: 100, align: 'right' });

        doc.text(sale.totalAmount.toFixed(2), 430, y, {
            width: 80,
            align: 'right',
        });

        y += 40;
        doc.moveDown(1);

        // -------------------------
        // Footer
        // -------------------------
        doc.fontSize(10).text('Thank you for your purchase!', {
            align: 'center',
        });

        doc.end();
    } catch (err: any) {
        res.status(500).json({ message: err.message || 'Unknown error' });
    }
};

export const getMonthlySales = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);

        const pipeline: any[] = [
            { $match: { createdAt: { $gte: start } } },

            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalRevenue: { $sum: "$totalAmount" },
                    totalSales: { $sum: 1 }
                }
            },

            { $sort: { "_id.year": 1, "_id.month": 1 } as any }
        ];

        const agg = await Sale.aggregate(pipeline);

        const map = new Map<string, { totalRevenue: number; totalSales: number }>();

        agg.forEach((row: any) => {
            const key = `${row._id.year}-${String(row._id.month).padStart(2, "0")}`;
            map.set(key, {
                totalRevenue: row.totalRevenue,
                totalSales: row.totalSales
            });
        });

        const labels: string[] = [];
        const revenueData: number[] = [];
        const salesCountData: number[] = [];

        for (let i = 0; i < 12; i++) {
            const dt = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
            const year = dt.getFullYear();
            const month = dt.getMonth() + 1;

            const key = `${year}-${String(month).padStart(2, "0")}`;
            labels.push(key);

            const entry = map.get(key);
            revenueData.push(entry?.totalRevenue ?? 0);
            salesCountData.push(entry?.totalSales ?? 0);
        }

        res.json({
            labels,
            revenueData,
            salesCountData,
            raw: agg
        });

    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return res.status(500).json({ message });
    }
};

export const getAllSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find()
            .populate({
                path: "items.item",
                select: "name",
            })
            .populate({
                path: "soldBy",
                select: "name",
            });

        res.json(sales);
    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: "Unknown error" });
    }
};



