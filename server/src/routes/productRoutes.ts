import { Router } from 'express';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
