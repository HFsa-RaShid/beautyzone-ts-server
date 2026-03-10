import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product.interface.js';

const arrayLimit = (val: string[]) => val.length === 4;

const productSchema = new Schema<IProduct>({
  name: { type: String, required: [true, "Product name is required"], trim: true },
  description: { type: String, trim: true, default: "" },
  STRAIGHT_UP: { type: String, default: "", trim: true },
  THE_LOWDOWN: { type: String, default: "", trim: true },
  price: { type: Number, required: [true, "Product price is required"], min: [0, "Price cannot be negative"] },
  images: { 
    type: [String], 
    required: [true, "Images are required"], 
    validate: [arrayLimit, "Exactly 4 images are required"] 
  },
  category: { type: String, default: "General", trim: true },
  stock: { type: Number, default: 0, min: [0, "Stock cannot be negative"] },
}, { timestamps: true });

export const Product = mongoose.model<IProduct>("Product", productSchema, "product");