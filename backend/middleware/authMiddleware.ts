import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { IUserRequest } from '../types';

export const protect = async (req: IUserRequest, res: Response, next: NextFunction) => {
    const reqTyped = req as Request & { user?: IUser };
    const authHeader = reqTyped.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            req.user = await User.findById(decoded.id).select('-password') as IUser;
            next();
        } catch (err: unknown) {
            if (err instanceof Error) {
                res.status(401).json({ message: err.message });
            } else {
                res.status(401).json({ message: 'Not authorized' });
            }
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
}