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

export const addOrder = async (req: Request, res: Response) => {
  try {
    console.log('Incoming Order:', req.body); // Log the request body
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error: any) {
    console.error('Error adding order:', error.response?.data || error.message); // Improved error logging
    res.status(500).json({
      message: 'Error adding order',
      error: error.response?.data || error.message,
    });
  }
};
