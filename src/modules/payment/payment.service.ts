import { Payment } from './payment.model.js';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config/index.js';
import { IPaymentRequest } from './payment.interface.js';


export const initiatePaymentDB = async (paymentData: IPaymentRequest, tran_id: string) => {
  const { name, email, phone, address, city, postcode, items, totalAmount } = paymentData;

  const sslData = {
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${config.api_url}/api/payment/success/${tran_id}`,
    fail_url: `${config.api_url}/api/payment/fail/${tran_id}`,
    cancel_url: `${config.api_url}/api/payment/cancel`,
    ipn_url: `${config.api_url}/api/payment/ipn`,
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

  const sslcz = new SSLCommerzPayment(
    config.ssl.store_id as string,
    config.ssl.store_pass as string,
    config.ssl.is_live
  );

  const apiResponse = await sslcz.init(sslData);
  if (apiResponse?.GatewayPageURL) {
    await Payment.create({
      transactionId: tran_id,
      items,
      amount: totalAmount,
      customer: { name, email, phone, address, city, postcode },
      paidStatus: false,
    });
  }
  return apiResponse;
};