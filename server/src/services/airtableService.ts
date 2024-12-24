import { airtableClient } from '../utils/airtableClient';

const validStatuses = ['Pending', 'Confirm', 'Shipped', 'Cancelled'];

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

  export const createOrder = async (order: Record<string, any>) => {
    try {
      const { ProductID, BuyerDetails, Status } = order;
  
      // Validate required fields
      if (!ProductID || !BuyerDetails || !Status) {
        throw new Error('Missing required fields: ProductID, BuyerDetails, or Status');
      }
  
      // Fetch the product name using ProductID
      const products = await fetchProducts();
      const product = products.find((p: any) => p.id === ProductID);
  
      if (!product) {
        throw new Error(`Product with ID ${ProductID} not found`);
      }
  
      const ProductName = product.fields.Name; // Extract the product name
  
      // Create the order with ProductName included
      const response = await airtableClient.post('/Orders', {
        fields: {
          ProductID: [ProductID], // Airtable expects an array for linked fields
          BuyerDetails,
          Status,
          ProductName, // Include the product name in the order
        },
      });
  
      return response.data;
    } catch (error: any) {
      console.error('Error creating order:', error.response?.data || error.message);
      throw new Error(`Failed to create order: ${error.response?.data || error.message}`);
    }
  };