export interface IPaymentRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  items: any[];
  totalAmount: number;
}