import { IProduct } from './product.interface.js';

export type CreateProductDTO = Omit<IProduct, keyof Document | '_id' | 'createdAt' | 'updatedAt'>;

