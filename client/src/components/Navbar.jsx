import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${searchTerm}`); // Redirect to the search results page
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <div className="flex justify-between items-center p-4 lg:hidden">
          {/* Left: Menu Button */}
          <button
            className="text-gray-700 text-2xl"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          {/* Middle: Search Bar (Visible only on small screens) */}
          <form className="flex w-full justify-center" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="px-4 py-2 border rounded-lg w-3/4 focus:outline-none"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>

        {/* Full Navbar for Larger Screens */}
        <div className="hidden lg:flex justify-between items-center p-4">
          {/* Left: Sidebar Menu (Always visible on larger screens) */}
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-lg text-gray-700 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className="text-lg text-gray-700 hover:text-gray-900">
                Store
              </Link>
            </li>
            <li>
              <Link to="/search" className="text-lg text-gray-700 hover:text-gray-900">
                Search
              </Link>
            </li>
            <li>
              <Link to="/account" className="text-lg text-gray-700 hover:text-gray-900">
                Account
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-lg text-gray-700 hover:text-gray-900">
                Cart
              </Link>
            </li>
          </ul>

          {/* Right: Account, Add Product, Cart */}
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate('/add')} // Navigate to the Add Product screen
            >
              Add Product
            </button>
            <button className="text-gray-700 hover:text-gray-900" onClick={() => navigate('/account')}>
              Account
            </button>
            <button className="text-gray-700 hover:text-gray-900" onClick={() => navigate('/cart')}>
              Cart
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (For Small Screens) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-md transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-20 lg:hidden`}
      >
        <button
          className="text-gray-700 text-2xl absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          ×
        </button>
        <ul className="mt-16 space-y-4 px-4">
          <li>
            <Link to="/" className="block text-lg text-gray-700 hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/store" className="block text-lg text-gray-700 hover:text-gray-900">
              Store
            </Link>
          </li>
          <li>
            <Link to="/search" className="block text-lg text-gray-700 hover:text-gray-900">
              Search
            </Link>
          </li>
          <li>
            <Link to="/account" className="block text-lg text-gray-700 hover:text-gray-900">
              Account
            </Link>
          </li>
          <li>
            <Link to="/cart" className="block text-lg text-gray-700 hover:text-gray-900">
              Cart
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
