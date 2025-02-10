import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paypal from "../Cart/paypal";

const Checkout = () => {
  const cart = {
    products: [
      {
        _id: 1, // Add a unique identifier for each product
        name: "Modern Laptop Bag",
        size: "M",
        color: "Black",
        Price: 120,
        image:
          "https://images.unsplash.com/photo-1737543456099-9e88da04eaef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        _id: 2,
        name: "Stylish Sneakers",
        size: "42",
        color: "White",
        Price: 80,
        image:
          "https://images.unsplash.com/photo-1738599778390-af77d7cf10e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        _id: 3,
        name: "Wireless Earbuds",
        size: "One Size",
        color: "Blue",
        Price: 50,
        image:
          "https://images.unsplash.com/photo-1735627062325-c978986b1871?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D",
      },
      {
        _id: 4,
        name: "Designer Watch",
        size: "M",
        color: "Silver",
        Price: 150,
        image:
          "https://images.unsplash.com/photo-1738516737618-06726c85ddab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    totalPrice: 395,
  };

  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckoutId(123);
    console.log("Shipping Address:", shippingAddress);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful", details);
    navigate("/orderConfirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>
        <div>
          <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
          {cart.products.map((product) => (
            <div key={product._id} className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover mr-4 rounded-lg"
              />
              <div>
                <h4 className="text-lg font-medium">{product.name}</h4>
                <p className="text-gray-600">
                  Size: {product.size}, Color: {product.color}
                </p>
                <p className="text-gray-600 font-semibold">${product.Price}</p>
              </div>
            </div>
          ))}
          <h3 className="text-xl font-semibold mb-4">Total Price: ${cart.totalPrice}</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Continue to Payment
              </button>
            ) : (
              <Paypal amount={cart.totalPrice} onSuccess={handlePaymentSuccess} onError={(err) => alert("Payment failed, please try again")} />
            )}
          </div>
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">
              Old Summary
        </h3>
        <div className="border-t py-4 mb-4">
          {
            cart.products.map((index,product)=>{
              <div key={index} className="flex items-center justify-between py-2  border-b">
                <div className=" flex items-starts">
                 <img src={product.image} alt={product.name} className="w-20 h-24  object-cover mr-4" />
                </div>
                <h3 className="h3 text-md">{product.name}</h3>
                <p className="text-gray-500">Sizes:{product.size}</p>
                <p className="text-gray-500">Color:{product.color}</p>
                
 
                </div>
                

            })
          }
        </div>
        <p className="text-xl">${product.Price?.toLocalStringy}</p>
      </div>
      <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>

      </div>
      <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
      </div>
      <div className="flex justify-between item-center text-lg mt-4 border-t pt-4">
        <p>Total</p>
        <p>${cart.totalPrice?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Checkout;
