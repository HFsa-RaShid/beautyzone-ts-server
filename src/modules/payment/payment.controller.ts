import { Request, Response } from "express";
import * as PaymentService from "./payment.service.js";
import { Payment } from "./payment.model.js";
import mongoose from "mongoose";

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const tran_id = new mongoose.Types.ObjectId().toString();
    const result = await PaymentService.initiatePaymentDB(req.body, tran_id);
    res.send({ url: result.GatewayPageURL });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const paymentSuccess = async (req: Request, res: Response) => {
  const { tranId } = req.params as { tranId: string };
  const result = await Payment.findOneAndUpdate(
    { transactionId: tranId as string },
    { paidStatus: true },
  );
  if (result) {
    res.redirect(
      `https://beautyzone-ts-client-ve1e.vercel.app/payment/success/${tranId}`,
    );
  } else {
    res.redirect(`https://beautyzone-ts-client-ve1e.vercel.app/payment/fail`);
  }
};

export const paymentFail = async (req: Request, res: Response) => {
  const { tranId } = req.params as { tranId: string };
  await Payment.findOneAndDelete({ transactionId: tranId as string });
  res.redirect(`https://beautyzone-ts-client-ve1e.vercel.app/payment/fail`);
};

export const getOrders = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const orders = await Payment.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const totalItems = await Payment.countDocuments();
  res.status(200).json({ data: { orders, pagination: { totalItems, page } } });
};
