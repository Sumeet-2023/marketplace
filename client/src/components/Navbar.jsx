import React, { useState } from 'react';
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
        <div className="flex justify-between items-center p-4">
          {/* Left: Menu Icon */}
          <button
            className="text-gray-700 text-2xl"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          {/* Right: Search Bar, Account, Cart (Visible on larger screens) */}
          <div className="hidden lg:flex space-x-4 items-center">
            <form className="flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="px-4 py-2 border rounded-l-lg focus:outline-none"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
              >
                Search
              </button>
            </form>
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={() => navigate('/account')}
            >
              Account
            </button>
            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={() => navigate('/cart')}
            >
              Cart
            </button>
          </div>

          {/* Search Bar (Centered on small screens) */}
          <form
            className="flex w-full justify-center lg:hidden"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              className="px-4 py-2 border rounded-lg w-3/4 focus:outline-none"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </nav>

      {/* Sidebar (Small screens only) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-md transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-20`}
      >
        <button
          className="text-gray-700 text-2xl absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          ×
        </button>
        <ul className="mt-16 space-y-4 px-4">
          <li>
            <button
              className="block text-lg text-gray-700 hover:text-gray-900"
              onClick={() => {
                toggleSidebar();
                navigate('/');
              }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className="block text-lg text-gray-700 hover:text-gray-900"
              onClick={() => {
                toggleSidebar();
                navigate('/store');
              }}
            >
              Store
            </button>
          </li>
          <li>
            <button
              className="block text-lg text-gray-700 hover:text-gray-900"
              onClick={() => {
                toggleSidebar();
                navigate('/search');
              }}
            >
              Search
            </button>
          </li>
          <li>
            <button
              className="block text-lg text-gray-700 hover:text-gray-900"
              onClick={() => {
                toggleSidebar();
                navigate('/account');
              }}
            >
              Account
            </button>
          </li>
          <li>
            <button
              className="block text-lg text-gray-700 hover:text-gray-900"
              onClick={() => {
                toggleSidebar();
                navigate('/cart');
              }}
            >
              Cart
            </button>
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

