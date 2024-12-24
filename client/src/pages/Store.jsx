import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Fetch all products from the API
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      {products.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <li key={product.id} className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{product.fields.Name}</h2>
              <p className="text-gray-500">${product.fields.Price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default Store;
