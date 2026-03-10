import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  STRAIGHT_UP: string;
  THE_LOWDOWN: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

