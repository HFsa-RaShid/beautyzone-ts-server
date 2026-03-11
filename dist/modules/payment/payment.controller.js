"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders =
  exports.paymentFail =
  exports.paymentSuccess =
  exports.initiatePayment =
    void 0;
const PaymentService = __importStar(require("./payment.service.js"));
const payment_model_js_1 = require("./payment.model.js");
const mongoose_1 = __importDefault(require("mongoose"));
const initiatePayment = async (req, res) => {
  try {
    const tran_id = new mongoose_1.default.Types.ObjectId().toString();
    const result = await PaymentService.initiatePaymentDB(req.body, tran_id);
    res.send({ url: result.GatewayPageURL });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.initiatePayment = initiatePayment;
const paymentSuccess = async (req, res) => {
  const { tranId } = req.params;
  const result = await payment_model_js_1.Payment.findOneAndUpdate(
    { transactionId: tranId },
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
exports.paymentSuccess = paymentSuccess;
const paymentFail = async (req, res) => {
  const { tranId } = req.params;
  await payment_model_js_1.Payment.findOneAndDelete({ transactionId: tranId });
  res.redirect(`https://beautyzone-ts-client-ve1e.vercel.app/payment/fail`);
};
exports.paymentFail = paymentFail;
const getOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const orders = await payment_model_js_1.Payment.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const totalItems = await payment_model_js_1.Payment.countDocuments();
  res.status(200).json({ data: { orders, pagination: { totalItems, page } } });
};
exports.getOrders = getOrders;
