import { Request, Response } from 'express';
import * as ProductService from './product.service.js';

export const getProducts = async (req: Request, res: Response) => {
  const result = await ProductService.getAllProductsDB();
  res.status(200).json(result);
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ProductService.getProductByIdDB(id);
  res.status(200).json(result);
};

export const createProduct = async (req: Request, res: Response) => {
  const result = await ProductService.createProductDB(req.body);
  res.status(201).json(result);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ProductService.updateProductDB(id, req.body);
  res.status(200).json(result);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await ProductService.deleteProductDB(id);
  res.status(200).json({ message: "Product deleted" });
};