import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
    name: string;
    category: string;
    unitPrice: number;
    quantity: number;
}

const itemSchema: Schema<IItem> = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true},
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

export default mongoose.model<IItem>('Item', itemSchema);