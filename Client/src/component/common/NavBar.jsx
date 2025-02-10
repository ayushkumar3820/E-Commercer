import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from 'react-icons/hi2';
import Searchbar from './SearchBar';
import CartPart from '../Cart/CartPart';
import { IoMdClose } from 'react-icons/io';

const NavBar = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const handleChange = () => {
    setCartOpen(!cartOpen);
  };
  const [isCartOpen, setISCartOpen] = useState(false);

  const handleChangeEvent = () => {
    setISCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Men
          </Link>
          <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Women
          </Link>
          <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Top Wear
          </Link>
          <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Bottom Wear
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="Admin"   className='block bg-black px-2 rounded text-sm  text-white '>Admin</Link>
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button onClick={handleChange} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>
          <div className="overflow-hidden">
            <Searchbar />
          </div>
          <button onClick={handleChangeEvent} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartPart cartOpen={cartOpen} handleChange={handleChange} />
      <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={handleChangeEvent}>
            <IoMdClose className='h-6 w-6 text-gray-500'/>
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu </h2>
            <nav className='space-y-4'>
              <Link to="#" onClick={handleChangeEvent}
              className='block  text-gray-700 hover:text-black'>
                Men
              </Link>
              <Link to="#" onClick={handleChangeEvent}
              className='block  text-gray-700 hover:text-black'>
                Women
              </Link>
              <Link to="#" onClick={handleChangeEvent}
              className='block  text-gray-700 hover:text-black'>
              Top Wear
              </Link>
              <Link to="#" onClick={handleChangeEvent}
              className='block  text-gray-700 hover:text-black'>
                Bottom Wear
              </Link>
            </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
