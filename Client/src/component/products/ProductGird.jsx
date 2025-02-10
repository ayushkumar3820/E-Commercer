import React from "react";
import { Link } from "react-router-dom";

const ProductGird = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="w-full h-48 mb-4">
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGird;
