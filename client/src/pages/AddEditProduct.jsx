import React from 'react';
import ProductForm from '../components/ProductForm';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <ProductForm productId={id} onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddEditProduct;
