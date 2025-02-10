import React, { useState } from "react";

const EditProductPage = () => {
  const [ProductData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countIndex: 0,
    sku: 0,
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      { url: "https://plus.unsplash.com/premium_photo-1738946837565-85f20772aae2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D" },
      { url: "https://images.unsplash.com/photo-1738851941930-0f2e4a87c0c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D" },
    ],
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>

      <form onSubmit={handlerSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={ProductData.name}
            onChange={handlerChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={ProductData.description}
            onChange={handlerChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={ProductData.price}
              onChange={handlerChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700">Stock Quantity</label>
            <input
              type="number"
              name="countIndex"
              value={ProductData.countIndex}
              onChange={handlerChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={ProductData.sku}
            onChange={handlerChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={ProductData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...ProductData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={ProductData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...ProductData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">Upload Images</label>
          <input type="file" onChange={handlerImageUpload} className="border p-2 rounded-md w-full" />
          
          {/* Display uploaded images */}
          <div className="flex gap-4 mt-4">
            {ProductData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
