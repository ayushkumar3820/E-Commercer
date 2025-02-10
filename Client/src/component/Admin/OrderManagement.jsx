import React from "react";

const OrderManagement = () => {
  const OrderData = [
    {
      _id: 12312,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
  ];

  const handlerStatusChange = (orderId, status) => {
    console.log({ id: orderId, status });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-700 border border-gray-300">
          <thead className="bg-gray-100 text-gray-800 uppercase text-sm">
            <tr>
              <th className="py-4 px-6 border-b">Order ID</th>
              <th className="py-4 px-6 border-b">Customer</th>
              <th className="py-4 px-6 border-b">Total Price</th>
              <th className="py-4 px-6 border-b">Status</th>
              <th className="py-4 px-6 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {OrderData.length > 0 ? (
              OrderData.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition border-b cursor-pointer"
                >
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-4 px-6">{order.user.name}</td> {/* ✅ Fixed name display */}
                  <td className="py-4 px-6 font-semibold">${order.totalPrice}</td>
                  <td className="py-4 px-6">
                    <select
                      value={order.status}
                      onChange={(e) => handlerStatusChange(order._id, e.target.value)}
                      className="bg-gray-100 border border-gray-400 text-gray-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handlerStatusChange(order._id, "Delivered")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
