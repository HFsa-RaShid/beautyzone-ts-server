import mongoose, { Schema } from 'mongoose';
import { IReview } from './review.interface.js';

const reviewSchema = new Schema<IReview>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhoto: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  date: { type: Date, default: Date.now }
});

export const Review = mongoose.model<IReview>("Review", reviewSchema, "review");