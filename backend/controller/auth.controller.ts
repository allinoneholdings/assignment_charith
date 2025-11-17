import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import {Types} from "mongoose";

const generateToken = (id: Types.ObjectId | string) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if(userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, role });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString())
        });
    } catch(err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id.toString())
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch(err: any) {
        res.status(500).json({ message: err.message });
    }
}