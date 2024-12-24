import React, { useState } from 'react';
import { addProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Price: '',
    Description: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    console.log('Form Data:', formData); // Log the entire formData object
  console.log('Types:');
  console.log('Name:', typeof formData.Name); // Check type of Name
  console.log('Price:', typeof formData.Price); // Check type of Price
  console.log('Description:', typeof formData.Description); // Check type of Description
    try {
      await addProduct(formData); // Call API
      navigate('/store'); // Redirect after successful submission
    } catch (error) {
      console.error('Error submitting the form:', error.response?.data || error.message);
      alert('Failed to add product. Check console for details.');
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Product Name"
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Price</label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Product Price"
          value={formData.Price}
          onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Product Description"
          value={formData.Description}
          onChange={(e) =>
            setFormData({ ...formData, Description: e.target.value })
          }
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
