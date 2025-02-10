import React from "react";
import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Newsletter Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-300 mb-2">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="text-sm text-gray-300 mb-4">Sign up and get 10% off your first order.</p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium">
            Subscribe
          </button>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-gray-300">
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/men-top-wear" className="hover:text-white transition">FAQ</Link></li>
            <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-5 text-gray-300">
            <a href="#" className="hover:text-white transition text-2xl">
              <IoLogoInstagram />
            </a>
            <a href="#" className="hover:text-white transition text-2xl">
              <IoLogoLinkedin />
            </a>
            <a href="#" className="hover:text-white transition text-2xl">
              <TbBrandMeta />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Call Us</h3>
          <div className="flex items-center space-x-3 text-gray-300">
            <FiPhoneCall className="text-xl" />
            <span className="text-lg font-medium">+123 456 7890</span>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-6">
        © 2025, <span className="text-white font-medium">CompileTab</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
