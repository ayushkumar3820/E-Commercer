import React from 'react';

const CartContent = () => {
  const products = [
    {
      productId: 1,
      name: "A",
      size: "XL",
      color: "red",
      quantity: 1,
      price: 24,
      image: "https://picsum.photos/200/300",
    },
    {
      productId: 1,
      name: "A",
      size: "XL",
      color: "red",
      quantity: 1,
      price: 24,
      image: "https://picsum.photos/200/301",
    },
  ];

  return (
    <div>
      {products.map((product, index) => (
        <div key={product.productId} className="flex items-center justify-between py-4 border-b">
          <div className="flex items-start">
            <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded" />
          </div>
          <h3>{product.name}</h3>
          <p className="text-sm text-gray-500">
            size: {product.size} | color: {product.color}
          </p>
          <div className="flex items-center mt-2">
            <button className="border rounded px-2 py-1 text-xl font-medium">
              -
            </button>
            <span className="mx-4">{product.quantity}</span>
            <button className="border rounded px-2 py-1 text-xl font-medium">
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;