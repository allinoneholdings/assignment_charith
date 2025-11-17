import mongoose, { Document, Schema } from 'mongoose';
import { IItem } from './Item';
import { IUser } from './User';

export interface ISaleItem {
    item: IItem['_id'];
    quantity: number;
}

export interface ISale extends Document {
    items: ISaleItem[];
    totalAmount: number;
    soldBy: IUser['_id'];
    createdAt: Date;
}

const saleSchema: Schema<ISale> = new Schema({
    items: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    soldBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISale>('Sale', saleSchema);