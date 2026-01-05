import React from "react";

export default function ShopBrand() {
  const brands = ["Nike", "Adidas", "Puma", "Reebok"];

  return (
    <div className="p-4">
      {/* Heading */}
      <h1 className="text-[19px] font-semibold text-left text-gray-800 mb-4 pl-3">
        Shop by Brand
      </h1>

      {/* Brand List */}
      <div className="flex  justify-center gap-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="w-60 h-12 flex items-center justify-center
                       border border-gray-600 rounded
                       text-gray-700 font-medium
                       cursor-pointer
                       hover:bg-black hover:text-white
                       transition-all duration-300"
          >
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
}