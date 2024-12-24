import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const categories = ['Electronics', 'Apparel', 'Home Appliances', 'Accessories'];

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-blue-100 p-8 rounded-lg text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Best Marketplace!</h1>
        <p className="text-lg text-gray-700">
          Discover amazing deals and sell your products with ease.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
        onClick={() => navigate('/store')}>
          Start Exploring
        </button>
      </div>

      {/* Featured Products */}
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md p-4 rounded-lg"
          >
            <h2 className="text-lg font-semibold">{product.fields.Name}</h2>
            <p className="text-gray-500">${product.fields.Price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Categories */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Categories</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-gray-200 p-4 rounded-lg text-center text-lg font-semibold hover:bg-gray-300 cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
