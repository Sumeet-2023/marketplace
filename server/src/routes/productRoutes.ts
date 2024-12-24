import { Router } from 'express';
import { getAllProducts, addProduct, updateProduct, deleteProduct, getProducts } from '../controllers/productController';

const router = Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/search', getProducts);

export default router;
