import { useState } from "react";

const images = [
  "https://picsum.photos/600/600?watch1",
  "https://picsum.photos/600/600?watch2",
  "https://picsum.photos/600/600?watch3",
];

export default function ProductDetail() {
  const [activeImg, setActiveImg] = useState(images[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-[#fffdf5] min-h-screen p-4 md:p-10">
      {/* Header */}
      <div className="bg-white rounded-full px-6 py-3 flex items-center gap-4 shadow">
        <button className="font-semibold">☰ Menu</button>

        <select className="border rounded px-2 py-1 text-sm">
          <option>All Products</option>
        </select>

        <input
          placeholder="Search for anything"
          className="flex-1 border rounded-full px-4 py-2 text-sm"
        />

        <button>Login</button>
        <button>🛒</button>
      </div>

      {/* Main */}
      <div className="grid md:grid-cols-2 gap-10 mt-10">
        {/* Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {images.map((img) => (
              <img
                key={img}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`w-16 h-16 object-cover border rounded cursor-pointer ${
                  activeImg === img ? "border-black" : ""
                }`}
              />
            ))}
          </div>

          <div className="flex-1 bg-white rounded-xl p-6 shadow">
            <img
              src={activeImg}
              className="w-full h-[350px] object-contain"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-semibold">
            Trackline Sport Edition
          </h1>

          <p className="text-gray-500 mt-2">
            Designed with activity tracking, heart-rate monitoring and smart
            alerts.
          </p>

          {/* Options */}
          <div className="mt-4">
            <p className="font-medium">Watch Material</p>
            <div className="flex gap-2 mt-2">
              {["Mesh", "Fiber", "Metal"].map((m) => (
                <button
                  key={m}
                  className="border px-3 py-1 rounded hover:bg-black hover:text-white"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium">Display</p>
            <div className="flex gap-2 mt-2">
              {["Digital", "Analog"].map((d) => (
                <button
                  key={d}
                  className="border px-3 py-1 rounded hover:bg-black hover:text-white"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <p className="text-2xl font-semibold mt-6">$149.00</p>
          <p className="text-sm text-green-600">
            ✔ In Stock, Ready to Ship
          </p>

          {/* Delivery */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {["Pickup", "Express", "Standard"].map((t) => (
              <div
                key={t}
                className="border rounded-lg p-3 text-center text-sm"
              >
                {t}
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="border px-3"
            >
              -
            </button>
            <span>{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="border px-3"
            >
              +
            </button>
          </div>

          <button className="w-full bg-black text-white py-3 rounded mt-4">
            Add to Cart
          </button>

          <button className="w-full border py-3 rounded mt-2">
            Buy Now
          </button>

          <p className="text-sm mt-4">✔ Free 30-Day Returns</p>
        </div>
      </div>

      {/* About */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">About the Product</h2>
        <p className="text-gray-600 mt-3 max-w-3xl">
          Equipped with activity tracking, heart-rate monitoring and smart
          alerts, this smartwatch keeps you connected throughout the day.
        </p>
      </div>
    </div>
  );
}