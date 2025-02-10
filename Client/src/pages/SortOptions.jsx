import React from "react";

const SortOptions = () => {

  const [searchParams,setSearchParams]=useSearchParams("");
  const handlerSortChanger=(e)=>{
    const sortBy=e.target.value;
    searchParams.set("sortBy",sortBy);
    setSearchParams(searchParams);
  }






  return (
    <div className="mb-4flex items-center justify-end">
      <select name="" id="sort" 
      onChange={handlerSortChanger}
      value={setSearchParams.get("sortBy") ||  "a" }
      className="border p-2  rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="PricesAsc">Prices:Low to High</option>
        <option value="PricesDes">Prices:High to Low </option>
        <option value="Popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
