import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: 123123,
      user: { name: "Ayush NS" },
      totalPrice: 120,
      status: "Processing",
    },
    {
      _id: 234234,
      user: { name: "John Doe" },
      totalPrice: 250,
      status: "Shipped",
    },
    {
      _id: 345345,
      user: { name: "Jane Smith" },
      totalPrice: 75,
      status: "Delivered",
    },
    {
      _id: 456456,
      user: { name: "Alice Brown" },
      totalPrice: 180,
      status: "Pending",
    },
    {
      _id: 567567,
      user: { name: "Robert White" },
      totalPrice: 300,
      status: "Processing",
    },
    {
      _id: 678678,
      user: { name: "Sophia Green" },
      totalPrice: 90,
      status: "Cancelled",
    },
    {
      _id: 789789,
      user: { name: "Michael Blue" },
      totalPrice: 400,
      status: "Shipped",
    },
    {
      _id: 890890,
      user: { name: "Olivia Black" },
      totalPrice: 500,
      status: "Delivered",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 shadow-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <h2 className="text-2xl font-semibold">Revenue</h2>
          <p className="text-3xl font-bold mt-2">$10,000</p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white">
          <h2 className="text-2xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">200</p>
          <Link
            to="/admin/orders"
            className="text-white underline hover:text-gray-200 transition"
          >
            Manage Orders
          </Link>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-3xl font-bold mt-2">100</p>
          <Link
            to="/admin/products"
            className="text-white underline hover:text-gray-200 transition"
          >
            Manage Products
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      {/* Recent Orders Table */}
      <div className="mt-10 rounded-2xl ">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Recent Orders</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full border border-gray-300 rounded-lg text-gray-700">
            {/* Table Header */}
            <thead className="bg-gray-100 text-gray-800 uppercase text-sm sticky top-0">
              <tr>
                <th className="py-4 px-6 border-b text-left">Order ID</th>
                <th className="py-4 px-6 border-b text-left">User</th>
                <th className="py-4 px-6 border-b text-left">Total Price</th>
                <th className="py-4 px-6 border-b text-left">Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-300">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 font-medium">{order._id}</td>
                    <td className="py-4 px-6">{order.user.name}</td>
                    <td className="py-4 px-6 font-semibold">
                      ${order.totalPrice}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full 
                                    ${
                                      order.status === "Processing"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : order.status === "Shipped"
                                        ? "bg-blue-100 text-blue-700"
                                        : order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Cancelled"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-gray-100 text-gray-700"
                                    }
                                `}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
