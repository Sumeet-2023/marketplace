import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id, updatedProduct) => {
  const response = await axios.patch(`${API_URL}/products/${id}`, updatedProduct);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

// Add an order
export const addOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };
  
  // Fetch all orders
  export const getOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  };