import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../component/products/FilterSideBar";
import SortOptions from "./SortOptions";
import ProductGird from "../component/products/ProductGird";

const CollectionsPage = () => {
  const [products, setProducts] = useState([]);
  const sideBarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handlerClickSide = (e) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlerClickSide);
    return () => {
      document.removeEventListener("mousedown", handlerClickSide);
    };
  }, []);

  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => {
      const fetchProducts = [
        {
          _id: 1,
          name: "Modern Laptop Bag",
          price: 120,
          images: [
            {
              url: "https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsb3RoaW5nfGVufDB8fDB8fHww",
            },
          ],
        },
        {
          _id: 2,
          name: "Stylish Sneakers",
          price: 80,
          images: [
            {
              url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3RoaW5nfGVufDB8fDB8fHww",
            },
          ],
        },
        {
          _id: 3,
          name: "Wireless Earbuds",
          price: 50,
          images: [
            {
              url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
            },
          ],
        },
        {
          _id: 4,
          name: "Designer Watch",
          price: 150,
          images: [
            {
              url: "https://plus.unsplash.com/premium_photo-1677234148135-2bb4f10f6332?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGNsb3RoaW5nfGVufDB8fDB8fHww",
            },
          ],
        },
        {
          _id: 5,
          name: "Casual Backpack",
          price: 70,
          images: [
            {
              url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
            },
          ],
        },
        {
          _id: 6,
          name: "Fitness Tracker",
          price: 60,
          images: [
            {
              url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
            },
          ],
        },
        {
          _id: 7,
          name: "Portable Speaker",
          price: 40,
          images: [
            {
              url: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8fDA%3D",
            },
          ],
        },
        {
          _id: 8,
          name: "Sleek Wallet",
          price: 30,
          images: [
            {
              url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dC52fGVufDB8fDB8fHww"
            }
          ],
        },
        {
          _id: 9,
          name: "Smartphone Case",
          price: 20,
          images: [
            {
              url: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            ],
        },
        {
          _id: 10,
          name: "Elegant Necklace",
          price: 100,
          images: [
            {
              url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlY2h8ZW58MHx8MHx8fDA%3D"
            }
          ],
        },
        {
          _id: 11,
          name: "Comfortable Headphones",
          price: 90,
          images: [
            {
              url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
            },
          ],
        },
        {
          _id: 12,
          name: "Trendy Sunglasses",
          price: 45,
          images: [
            {
              url: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
            },
          ],
        },
        {
          _id: 13,
          name: "Classic Leather Belt",
          price: 35,
          images: [
            {
              url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNsb3RoaW5nfGVufDB8fDB8fHww",
            },
          ],
        },
        {
          _id: 14,
          name: "High-Quality T-Shirt",
          price: 25,
          images: [
            {
              url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNsb3RoaW5nfGVufDB8fDB8fHww",
            },
          ],
        },
        {
          _id: 15,
          name: "Durable Luggage",
          price: 180,
          images: [
            {
              url: "https://images.unsplash.com/photo-1597673934455-f32e0fe3f529?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D",
            },
          ],
        },
        {
          _id: 16,
          name: "Stylish Hat",
          price: 20,
          images: [
            {
              url: "https://images.unsplash.com/photo-1618510069246-21f564373621?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D",
            },
          ],
        },
        {
          _id: 17,
          name: "Ergonomic Chair",
          price: 250,
          images: [
            {
              url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D",
            },
          ],
        },
        {
          _id: 18,
          name: "Modern Desk Lamp",
          price: 55,
          images: [
            {
              url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D",
            },
          ],
        },
        {
          _id: 19,
          name: "Cozy Blanket",
          price: 65,
          images: [
            {
              url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D",
            },
          ],
        },
        {
          _id: 20,
          name: "Portable Charger",
          price: 35,
          images: [
            {
              url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D",
            },
          ],
        },
      ];
      
      
      setProducts(fetchProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>
      <div
        ref={sideBarRef}
        className={`${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>
        <SortOptions />
        <ProductGird products={products} />
      </div>
    </div>
  );
};

export default CollectionsPage;
