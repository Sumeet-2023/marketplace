import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';

const Cart = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      <ul className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
            >
              <div>
                <h3 className="text-lg font-semibold">{order.fields.ProductName}</h3>
                <p className="text-gray-500">Status: {order.fields.Status}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </ul>
    </div>
  );
};

export default Cart;
