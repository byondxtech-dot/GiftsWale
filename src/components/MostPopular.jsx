import React from "react";

const products = Array(4).fill({
  img: "https://picsum.photos/400/500",
  discount: "-5%",
  category: "Toys",
  title: "Small Child Toy",
  price: 1000,
  oldPrice: 2000,
  stock: true,
  tag: "Bestseller",
});

export default function MostPopular() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Most Popular</h2>
        <button className="text-sm font-medium text-gray-600">
          Shop All
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <div key={index}>
            
            {/* IMAGE CARD */}
            <div className="relative h-[320px] bg-gray-100 border rounded-2xl overflow-hidden">
              
              {/* PRODUCT IMAGE */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* DISCOUNT */}
              <span className="absolute top-3 left-3 bg-yellow-200 text-xs font-semibold px-2 py-1 rounded">
                {item.discount}
              </span>

              {/* BESTSELLER */}
              <span className="absolute bottom-3 left-3 bg-white border text-xs px-2 py-1 rounded">
                {item.tag}
              </span>
            </div>

            {/* CONTENT */}
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600">{item.category}</p>
              <h3 className="text-sm font-medium">{item.title}</h3>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">₹{item.price}</span>
                <span className="line-through text-gray-400">
                  ₹{item.oldPrice}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span>{item.stock ? "In Stock" : "Out of Stock"}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}