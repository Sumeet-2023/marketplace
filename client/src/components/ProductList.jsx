import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, addOrder, getOrders } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    // Fetch orders
    const fetchOrders = async () => {
      const orders = await getOrders();
      const confirmedOrders = orders.filter(
        (order) => order.fields.Status === 'Shipped'
      ); // Filter only confirmed orders
      setReceivedOrders(confirmedOrders);
    };

    fetchProducts();
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleOrder = async (product) => {
    try {
      const orderData = {
        ProductID: product.id,
        BuyerDetails: 'John Doe - johndoe@example.com',
        Status: 'Pending',
      };

      await addOrder(orderData);
      navigate('/cart');
      alert(`${product.fields.Name} has been added to your cart!`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Product List
      </h1>
      {/* Product Cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {product.fields.Name}
              </h3>
              <p className="text-gray-500 mb-4">${product.fields.Price}</p>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => handleOrder(product)}
                >
                  Order
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Received Orders Section */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-blue-600">Received Orders</h2>
      <ul className="space-y-4">
        {receivedOrders.length > 0 ? (
          receivedOrders.map((order) => (
            <li
              key={order.id}
              className="bg-green-50 shadow-md p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {order.fields.ProductName || 'Unknown Product'}
                </h3>
                <p className="text-gray-500">Buyer: {order.fields.BuyerDetails}</p>
              </div>
              <div>
                <p className="text-green-600 font-bold">{order.fields.Status}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No received orders yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
