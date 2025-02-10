import React from "react";
import { Link } from "react-router-dom"; // ✅ Added missing import

const ProductManagement = () => {
  const products = [
    {
      _id: 12121,
      name: "Shirt",
      price: 120,
      sku: "123123",
    },
  ];

  const handlerDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product with ID", id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2> {/* ✅ Fixed typo */}

      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="min-w-full text-left text-gray-700 border border-gray-300">
          <thead className="bg-gray-100 text-gray-800 uppercase text-sm">
            <tr>
              <th className="py-4 px-6 border-b">Name</th>
              <th className="py-4 px-6 border-b">Price</th>
              <th className="py-4 px-6 border-b">SKU</th>
              <th className="py-4 px-6 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 border-b cursor-pointer transition">
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-4 px-6">${product.price}</td>
                  <td className="py-4 px-6">{product.sku}</td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-2 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handlerDelete(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
