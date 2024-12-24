import { Request, Response } from 'express';
import { fetchProducts, createProduct, updateProductById, deleteProductById } from '../services/airtableService';

export interface Product {
    id: string;
    fields: {
      Name: string;
      [key: string]: any; // For other dynamic fields
    };
  }

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await fetchProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Add a product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id; // Airtable record ID
    const updatedFields = req.body; // Fields to update
  
    try {
      const updatedProduct = await updateProductById(productId, updatedFields);
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      console.error('Error updating product:', error.message);
      res.status(500).json({ message: 'Error updating product', error });
    }
  };

  // Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id; // Airtable record ID
  
    try {
      await deleteProductById(productId);
      res.status(200).json({ message: `Product with ID ${productId} deleted successfully.` });
    } catch (error: any) {
      console.error('Error deleting product:', error.message);
      res.status(500).json({ message: 'Error deleting product', error });
    }
  };

  export const getProducts = async (req: Request, res: Response) => {
    const { name } = req.query; // Query parameter
    try {
      const records: Product[] = await fetchProducts(); // Explicitly type records
  
      // Filter by name
      const filteredRecords = name
        ? records.filter((product) =>
            product.fields.Name.toLowerCase().includes((name as string).toLowerCase())
          )
        : records;
  
      res.status(200).json(filteredRecords);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  };