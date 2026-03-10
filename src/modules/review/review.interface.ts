import { Document, Types } from 'mongoose';

export interface IReview extends Document {
  productId: Types.ObjectId;
  userName: string;
  userEmail: string;
  userPhoto: string;
  rating: number;
  comment: string;
  date: Date;
}

