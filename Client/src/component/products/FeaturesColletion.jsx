import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/pexels-photo-301952.jpeg";

const FeaturesCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-2xl">
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Discover high-quality, comfortable clothing that effortlessly
            blends fashion and function. Designed to make you look and feel
            great every day.
          </p>
          <Link
            to={`/collection/all`}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Shop Now
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured collection"
            className="h-full w-full object-cover lg:rounded-r-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesCollection;
