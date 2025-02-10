import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";

const CartPart = ({ cartOpen, handleChange, cartItems }) => {
  const navigate=useNavigate();
  const handleCartCheckout=()=>{
    handleChange();
    navigate("/Checkout")
  }
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[35rem] h-full bg-white shadow-lg transform transition-transform duration-200 flex flex-col z-50 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center p-5">
        <button onClick={handleChange}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">my cart</h2>
        <CartContent cartItems={cartItems} />
      </div>
      <div className="p-4 bg-white sticky bottom-0">
        <button  onClick={handleCartCheckout}className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-transform">
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartPart;
