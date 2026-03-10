"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiatePaymentDB = void 0;
const payment_model_js_1 = require("./payment.model.js");
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const index_js_1 = __importDefault(require("../../config/index.js"));
const initiatePaymentDB = async (paymentData, tran_id) => {
    const { name, email, phone, address, city, postcode, items, totalAmount } = paymentData;
    const sslData = {
        total_amount: totalAmount,
        currency: "BDT",
        tran_id: tran_id,
        success_url: `${index_js_1.default.api_url}/api/payment/success/${tran_id}`,
        fail_url: `${index_js_1.default.api_url}/api/payment/fail/${tran_id}`,
        cancel_url: `${index_js_1.default.api_url}/api/payment/cancel`,
        ipn_url: `${index_js_1.default.api_url}/api/payment/ipn`,
        shipping_method: "Courier",
        product_name: "Skincare Products",
        product_category: "Cosmetics",
        product_profile: "general",
        cus_name: name, cus_email: email, cus_add1: address,
        cus_city: city, cus_postcode: postcode, cus_country: "Bangladesh",
        cus_phone: phone, ship_name: name, ship_add1: address,
        ship_city: city, ship_state: city, ship_postcode: postcode,
        ship_country: "Bangladesh",
    };
    const sslcz = new sslcommerz_lts_1.default(index_js_1.default.ssl.store_id, index_js_1.default.ssl.store_pass, index_js_1.default.ssl.is_live);
    const apiResponse = await sslcz.init(sslData);
    if (apiResponse?.GatewayPageURL) {
        await payment_model_js_1.Payment.create({
            transactionId: tran_id,
            items,
            amount: totalAmount,
            customer: { name, email, phone, address, city, postcode },
            paidStatus: false,
        });
    }
    return apiResponse;
};
exports.initiatePaymentDB = initiatePaymentDB;
