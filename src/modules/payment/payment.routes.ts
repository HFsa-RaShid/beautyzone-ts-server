import { Router } from 'express';
import * as Controller from './payment.controller.js';

const router = Router();
router.post("/init", Controller.initiatePayment);
router.post("/success/:tranId", Controller.paymentSuccess);
router.post("/fail/:tranId", Controller.paymentFail);
router.get("/", Controller.getOrders);

export const PaymentRoutes = router;