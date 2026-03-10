import { Router } from 'express';
import * as Controller from './product.controller.js';

const router = Router();

router.get('/', Controller.getProducts);
router.get('/:id', Controller.getProductById);
router.post('/', Controller.createProduct);
router.patch('/:id', Controller.updateProduct);
router.delete('/:id', Controller.deleteProduct);

export const ProductRoutes = router;