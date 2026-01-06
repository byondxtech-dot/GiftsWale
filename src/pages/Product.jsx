import React, { useState } from "react";

const products = [
  {
    title: "Small Child Toy",
    category: "Toys",
    price: 1000,
    oldPrice: 2000,
    discount: "-50%",
    rating: 4.5,
    reviews: 128,
    stock: true,
    description:
      "High-quality toy made from safe materials. Perfect for kids.",
    images: [
      "https://picsum.photos/600/600?1",
      "https://picsum.photos/600/600?2",
      "https://picsum.photos/600/600?3",
      "https://picsum.photos/600/600?4",
    ],
  },
  {
    title: "Kids Learning Toy",
    category: "Education",
    price: 1200,
    oldPrice: 2400,
    discount: "-50%",
    rating: 4.7,
    reviews: 92,
    stock: true,
    description:
      "Educational toy to boost kids creativity and learning.",
    images: [
      "https://picsum.photos/600/600?5",
      "https://picsum.photos/600/600?6",
      "https://picsum.photos/600/600?7",
      "https://picsum.photos/600/600?8",
    ],
  },
];

function ProductCard({ product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">

      {/* IMAGE */}
      <div className="relative bg-gray-100 h-72">
        <img
          src={activeImage}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-yellow-200 text-xs font-semibold px-2 py-1 rounded">
          {product.discount}
        </span>
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-2 p-3">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`w-14 h-14 rounded-lg overflow-hidden border ${
              activeImage === img ? "border-black" : "border-gray-200"
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500">{product.category}</p>

        <h2 className="text-lg font-semibold">{product.title}</h2>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500">★ {product.rating}</span>
          <span className="text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">₹{product.price}</span>
          <span className="line-through text-gray-400 text-sm">
            ₹{product.oldPrice}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span
            className={`w-2 h-2 rounded-full ${
              product.stock ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          <span>{product.stock ? "In Stock" : "Out of Stock"}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* QTY */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium">Qty</span>
          <div className="flex border rounded-lg overflow-hidden">
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-3">-</button>
            <span className="px-4">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="px-3">+</button>
          </div>
        </div>

        <div className="flex gap-3 pt-3">
          <button className="flex-1 bg-black text-white py-2 rounded-xl text-sm">
            Add to Cart
          </button>
          <button className="flex-1 border py-2 rounded-xl text-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((item, index) => (
        <ProductCard key={index} product={item} />
      ))}
    </div>
  );
}