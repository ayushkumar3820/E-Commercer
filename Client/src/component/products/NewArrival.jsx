import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NewArrival = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);  // Added missing state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrival = [
    {
      _id: "1",
      name: "Classic White Sneakers",
      price: 89.99,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          altText: "Classic White Sneakers on display"
        },
      ],
    },
    {
      _id: "2",
      name: "Leather Crossbody Bag",
      price: 149.99,
      images: [
        {
          url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          altText: "Brown leather crossbody bag"
        },
      ],
    },
    {
      _id: "3",
      name: "Denim Jacket",
      price: 79.99,
      images: [
        {
          url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          altText: "Classic blue denim jacket"
        },
      ],
    },
    {
      _id: "4",
      name: "Summer Floral Dress",
      price: 65.99,
      images: [
        {
          url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          altText: "Floral print summer dress"
        },
      ],
    },
    {
      _id: "5",
      name: "Athletic Running Shoes",
      price: 129.99,
      images: [
        {
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          altText: "Red and black athletic running shoes"
        },
      ],
    },
    {
      _id: "6",
      name: "Designer Sunglasses",
      price: 199.99,
      images: [
        {
          url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
          altText: "Premium designer sunglasses"
        },
      ],
    }
  ];

  const handleMouseDown = (e) => {  // Fixed function name spelling
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);  // Set initial scrollLeft
  };

  const handleMouseMove = (e) => {  // Fixed function name spelling
    if (!isDragging) return;
    e.preventDefault();  // Prevent text selection while dragging
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX);
    scrollRef.current.scrollLeft = scrollLeft - walk;  // Use state scrollLeft
  };

  const handleMouseUpOrLeave = () => {  // Fixed function name spelling
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);

      console.log({
        scrollLeft: container.scrollLeft,
        clientWidth: container.clientWidth,
        containerScrollWidth: container.scrollWidth,
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();

      return () => {
        container.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, []);

  return (
    <div>
      <section className="container flex flex-col mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>
        <div className="absolute right-0 bottom-[30px] flex space-x-2">
          <button 
            className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button 
            className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </section>
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        ref={scrollRef} 
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {newArrival.map((product) => (
          <div 
            className="min-w-[120px] sm:min-w-[50%] lg:min-w-[30%] relative group" 
            key={product._id}
          >
            <img 
              src={product.images[0]?.url} 
              alt={product.images[0]?.altText || product.name} 
              draggable="false"
              className="w-full h-[500px] object-cover rounded-lg" 
            />
            <div className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg transform transition-all duration-300 group-hover:bg-opacity-70">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium text-lg">{product.name}</h4>
                <p className="mt-1 text-xl font-semibold">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;