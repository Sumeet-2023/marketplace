import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar with Sidebar
import Home from './pages/Home'; // Home Page
import Account from './pages/Account'; // Account Page (placeholder)
import Cart from './pages/Cart'; // Cart Page (placeholder)
import ProductForm from './components/ProductForm'; // Product Form Component
import ProductList from './components/ProductList';
import SearchResults from './pages/SearchResults';

const App = () => { 

  return (
    <Router>
      {/* Navbar is always displayed */}
      <Navbar />

      {/* Main Content */}
      <div className="mt-16 p-4"> {/* Add margin to avoid overlapping Navbar */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/store" element={<ProductList />} /> {/* Store Page */}
          <Route path="/account" element={<Account />} /> {/* Account Page */}
          <Route path="/cart" element={<Cart />} /> {/* Cart Page */}
          <Route path="/add" element={<ProductForm />} /> {/* Add Product Page */}
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
