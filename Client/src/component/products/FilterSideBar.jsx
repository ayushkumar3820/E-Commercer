import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red", "Blue", "Black", "Green", "Yellow", "Grey", "White", "Pink", "Beige", "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Viscose", "Fleece",
  ];
  const brands = [
    "Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChinStyle",
  ];
  const genders = ["Men", "Women"];

  const handlerFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlerPriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([filters.minPrice, newPrice]);
    const newFilters = { ...filters, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([params.minPrice || 0, params.maxPrice || 100]);
  }, [searchParams]);

  return (
    <div className='p-4'>
      <h3 className="text-xl font-medium text-gray-600 mb-2">Filter</h3>

      {/* Category Section */}
      <div className="mb-6">
        <label className='block text-gray-700 font-medium mb-2'>Category</label>
        {categories.map((category) => (
          <div key={category} className='flex items-center mb-1'>
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handlerFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700'>{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Section */}
      <div className="mb-6">
        <label className='block text-gray-700 font-medium mb-2'>Gender</label>
        {genders.map((gender) => (
          <div key={gender} className='flex items-center mb-1'>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handlerFilterChange}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700'>{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Section */}
      <div className="mb-6">
        <label className='block text-gray-700 font-medium mb-2'>Color</label>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={() => handlerFilterChange({ target: { name: 'color', value: color } })}
              className='h-8 w-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105'
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>

      {/* Size Section */}
      <div className="mb-6">
        <label className='block text-gray-700 font-medium mb-2'>Size</label>
        {sizes.map((size) => (
          <div key={size} className='flex items-center mb-1'>
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handlerFilterChange}
              checked={filters.size.includes(size)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700'>{size}</span>
          </div>
        ))}
      </div>

      {/* Material Section */}
      <div className="mb-6">
        <label className='block text-gray-700 font-medium mb-2'>Material</label>
        {materials.map((material) => (
          <div key={material} className='flex items-center mb-1'>
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handlerFilterChange}
              checked={filters.material.includes(material)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700'>{material}</span>
          </div>
        ))}
      </div>

      {/* Brand Section */}
      <div className="mb-6">
        <label className='block text-gray-700 font-medium mb-2'>Brand</label>
        {brands.map((brand) => (
          <div key={brand} className='flex items-center mb-1'>
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handlerFilterChange}
              checked={filters.brand.includes(brand)}
              className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
            />
            <span className='text-gray-700'>{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <label className='block text-gray-700 font-medium mb-2'>Price Range</label>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlerPriceChange}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
        />
        <div className='flex justify-between text-green-600 mt-2'>
          <span className='text-gray-700'>${priceRange[0]}</span>
          <span className='text-gray-700'>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
