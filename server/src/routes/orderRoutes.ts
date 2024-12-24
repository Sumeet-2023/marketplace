import { Router } from 'express';
import { getAllOrders, addOrder } from '../controllers/orderController';

const router = Router();

router.get('/', getAllOrders); // Fetch all orders
router.post('/',addOrder ); // Place a new order

export default router;
