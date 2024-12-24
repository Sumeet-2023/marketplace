import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams(); // Get the 'name' query parameter
  const searchTerm = searchParams.get('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/search`, {
          params: { name: searchTerm }, // Pass 'name' as a query parameter
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchTerm]); // Re-fetch when searchTerm changes

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{searchTerm}"</h1>
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
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
