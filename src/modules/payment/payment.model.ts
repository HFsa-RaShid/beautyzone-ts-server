import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  transactionId: string;
  items: any[];
  amount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
  };
  paidStatus: boolean;
  createdAt?: Date;
}

const paymentSchema = new Schema<IPayment>({
  transactionId: { type: String, required: true, unique: true },
  items: { type: [Schema.Types.Mixed] as any, required: true },
  amount: { type: Number, required: true },
  customer: {
    name: String, email: String, phone: String, 
    address: String, city: String, postcode: String,
  },
  paidStatus: { type: Boolean, default: false },
}, { timestamps: true });

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema, "payments");