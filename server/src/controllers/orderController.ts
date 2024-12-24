import { Request, Response } from 'express';
import { fetchOrders, createOrder } from '../services/airtableService';

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await fetchOrders();
    res.status(200).json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Add a new order
export const addOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error: any) {
    console.error('Error adding order:', error.message);
    res.status(500).json({ message: 'Error adding order', error });
  }
};
