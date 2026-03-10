import { Review } from './review.model.js';
import mongoose from 'mongoose';

export const getReviewsByProductDB = async (productId: string, page: number) => {
  const limit = 4;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ productId: new mongoose.Types.ObjectId(productId) })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const totalReviews = await Review.countDocuments({ productId: new mongoose.Types.ObjectId(productId) });

  return { reviews, totalReviews, totalPages: Math.ceil(totalReviews / limit) };
};

export const getAllReviewsDB = async () => {
  return await Review.find().sort({ date: -1 });
};

export const createReviewDB = async (data: any) => {
  return await Review.create(data);
};