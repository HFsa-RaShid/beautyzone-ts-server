import { Router } from 'express';
import * as Controller from './review.controller.js';

const router = Router();

router.get('/reviews', Controller.getAllReviews);
router.post('/reviews', Controller.createReview);
router.get("/reviews/:productId", Controller.getReviewsByProduct);

export const ReviewRoutes = router;