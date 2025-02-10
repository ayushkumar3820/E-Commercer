import React, { useEffect, useState } from "react";
import { toast } from "sonner";
const ProductDetails = () => {
  const similarProduct=[
    
  ]
  // Product data with realistic images
  const selectedProduct = {
    name: "Styles Leather Jacket",
    price: 120,
    originPrice: 150,
    description: "This is a stylish leather jacket perfect for any occasion. Features premium quality material and modern design.",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black", "Brown"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        altText: "Black leather jacket front view"
      },
      {
        url: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        altText: "Black leather jacket back view"
      },
      {
        url: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        altText: "Black leather jacket detail view"
      }
    ],
  };

  // State management
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Handle quantity changes
  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handlerAddToCart=()=>{
    if(!selectedSize || !selectedColor){
      toast.error("pls select a size and color  before  adding ",{
        duration:1000,
      });
      return ;
    }

    setIsButtonDisabled(true);
    setTimeout(()=>{
      toast.success("product added to cart ",{
        duration:1000,
      });
      setIsButtonDisabled(false);

    },500);
  }

  // Set initial main image
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Desktop thumbnail sidebar */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                onClick={() => setMainImage(image.url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main image container */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt="Main product view"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Mobile thumbnails */}
          <div className="md:hidden flex overflow-x-auto space-x-4 mb-4 p-2">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                onClick={() => setMainImage(image.url)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Product details */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xl font-bold">${selectedProduct.price}</p>
              {selectedProduct.originPrice && (
                <p className="text-lg text-gray-500 line-through">
                  ${selectedProduct.originPrice}
                </p>
              )}
            </div>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color selection */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "border-gray-300 text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-2">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <button
            onClick={handlerAddToCart}
              className={`bg-black text-white py-3 px-6 rounded-lg w-full mb-4  ${isButtonDisabled ? "curser-not-allowed opacity-50 ":" hover:bg-gray-900"}`}
              disabled={isButtonDisabled || !selectedSize || !selectedColor}
            >
              {isButtonDisabled ? "Adding...." :"Add to Cart"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;