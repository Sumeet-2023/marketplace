import { airtableClient } from '../utils/airtableClient';

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await airtableClient.get('/Products'); // Replace 'Products' with your table name
    return response.data.records;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }
};

// Create a new product
export const createProduct = async (product: Record<string, any>) => {
  try {
    const response = await airtableClient.post('/Products', {
      fields: product,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create product: ${error}`);
  }
};

// Update a product by ID
export const updateProductById = async (id: string, updatedFields: Record<string, any>) => {
    try {
      const response = await airtableClient.patch(`/Products/${id}`, {
        fields: updatedFields,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to update product with ID ${id}: ${error.response?.data || error.message}`);
    }
  };

  export const deleteProductById = async (id: string) => {
    try {
      const response = await airtableClient.delete(`/Products/${id}`); // Use Airtable's DELETE method
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to delete product with ID ${id}: ${error.response?.data || error.message}`);
    }
  };

// Fetch all orders
export const fetchOrders = async () => {
    try {
      const response = await airtableClient.get('/Orders'); // Replace 'Orders' with your table name
      return response.data.records;
    } catch (error: any) {
      throw new Error(`Failed to fetch orders: ${error.response?.data || error.message}`);
    }
  };
  
  // Create a new order
  export const createOrder = async (order: Record<string, any>) => {
    try {
      const response = await airtableClient.post('/Orders', {
        fields: order,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create order: ${error.response?.data || error.message}`);
    }
  };
  