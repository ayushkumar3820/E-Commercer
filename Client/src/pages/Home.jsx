import React from "react";
import Hero from "../component/layout/Hero";
import GenderCollectionSection from "../component/products/GenderCollectionSection";
import NewArrival from "../component/products/NewArrival";
import ProductDetails from "../component/products/ProductDetails";
import ProductGird from "../component/products/ProductGird";
import FeaturesCollection from "../component/products/FeaturesColletion";
import FeatureSection from "../component/products/FeatureSection";

// Define placeholderProducts with consistent image URLs
const placeholderProducts = [
  {
    _id: 1,
    name: "product_1",
    price: 1000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    _id: 2,
    name: "product_2",
    price: 2000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHNob3B8ZW58MHx8MHx8fDA%3D",
      },
    ],
  },
  {
    _id: 3,
    name: "product_3",
    price: 3000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    _id: 4,
    name: "product_4",
    price: 4000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob3B8ZW58MHx8MHx8fDA%3D",
      },
    ],
  },
  {
    _id: 5,
    name: "product_5",
    price: 5000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww",
      },
    ],
  },
  {
    _id: 6,
    name: "product_6",
    price: 6000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8fDA%3D",
      },
    ],
  },
  {
    _id: 7,
    name: "product_7",
    price: 7000,
    images: [
      {
        url: "https://media.istockphoto.com/id/1279108197/photo/variety-of-womens-fashion-comfortable-shoes-of-all-seasons-on-a-light-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=egrXx_zXNkFg74KkmrRwmCywJD4YcP3NWchqYkLoHPM="
      },
    ],
  },
  {
    _id: 8,
    name: "product_8",
    price: 8000,
    images: [
      {
        url:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob2V8ZW58MHx8MHx8fDA%3D"
      },
    ],
  },
];


const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
      <div className="container mx-auto">
        <div className="text-3xl text-center font-bold mb-4">
          Top Wears For Woman
        </div>
        <ProductGird Products={placeholderProducts} />
      </div>
      <FeaturesCollection/>
      <FeatureSection/>
    </div>
  );
};

export default Home;
