import { Request, Response } from 'express';
import * as ReviewService from './review.service.js';

export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId as string;
    const page = parseInt(req.query.page as string) || 1;
    const result = await ReviewService.getReviewsByProductDB(productId, page);
    res.json({ ...result, currentPage: page });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewService.getAllReviewsDB();
    res.json(reviews);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const savedReview = await ReviewService.createReviewDB(req.body);
    res.status(201).json(savedReview);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};