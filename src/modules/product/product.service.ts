import { Product } from './product.model.js';

export const getAllProductsDB = async () => {
  return await Product.find({});
};

export const getProductByIdDB = async (id: string) => {
  return await Product.findById(id);
};

export const createProductDB = async (data: any) => {
  return await Product.create(data);
};

export const updateProductDB = async (id: string, data: any) => {
  return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteProductDB = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};