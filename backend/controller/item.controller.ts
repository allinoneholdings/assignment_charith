import { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

export const addItem = async (req: Request, res: Response) => {
    try {
        const { name, category, unitPrice, quantity }: IItem = req.body;

        const itemExists = await Item.findOne({ name, category });
        if (itemExists) return res.status(400).json({ message: 'Item already exists' });

        const item = await Item.create({ name, category, unitPrice, quantity });
        res.status(201).json(item);

    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
}

export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
}

export const getItemById = async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
}

export const updateItem = async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const { name, category, unitPrice, quantity } = req.body;
        if (name) item.name = name;
        if (category) item.category = category;
        if (unitPrice !== undefined) item.unitPrice = unitPrice;
        if (quantity !== undefined) item.quantity = quantity;

        await item.save();
        res.json(item);

    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.deleteOne();
        res.json({ message: 'Item deleted successfully' });

    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
};

export const getLowStockItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.find({ quantity: { $lt: 5 } });
        res.json(items);
    } catch (err: unknown) {
        if (err instanceof Error) res.status(500).json({ message: err.message });
        else res.status(500).json({ message: 'Unknown error' });
    }
}