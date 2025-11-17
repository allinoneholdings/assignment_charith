import { Request, Response } from 'express';
import Sale, { ISale, ISaleItem } from '../models/Sales';
import Item from '../models/Item';
import { IUserRequest } from '../types';

export const createSale = async (req: IUserRequest, res: Response) => {
    try {
        const { items }: { items: ISaleItem[] } = req.body;
        const soldBy = req.user?._id;

        if (!soldBy) return res.status(401).json({ message: 'Unauthorized' });

        let totalAmount = 0;

        for (const i of items) {
            const item = await Item.findById(i.item);
            if (!item) return res.status(404).json({ message: 'Item not found' });
            if (item.quantity < i.quantity)
                return res.status(400).json({ message: `Not enough stock for ${item.name}` });

            item.quantity -= i.quantity;
            await item.save();

            totalAmount += i.quantity * item.unitPrice;
        }

        const sale = await Sale.create({ items, totalAmount, soldBy });
        res.status(201).json(sale);

    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
}

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