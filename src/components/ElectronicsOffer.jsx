import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight } from "lucide-react";

import "swiper/css";

const products = [
  {
    img: "https://picsum.photos/300/300?1",
    discount: "-14%",
    tag: "Exclusive",
    category: "Electronics",
    title: "Pulse Watch S2",
    price: "$129.00",
    oldPrice: "$150.00",
  },
  {
    img: "https://picsum.photos/300/300?2",
    category: "Electronics",
    title: "Gaming Headset X20",
    price: "$69.00",
  },
  {
    img: "https://picsum.photos/300/300?3",
    category: "Electronics",
    title: "ClipGo Travel Speaker",
    price: "$59.00",
  },
  {
    img: "https://picsum.photos/300/300?4",
    category: "Electronics",
    title: "Bluetooth Speaker Pro",
    price: "$79.00",
  },
];

export default function ElectronicsOffer() {
  const swiperRef = useRef(null);

  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row gap-6 bg-black/90 rounded-2xl p-6">

        {/* LEFT OFFER */}
        <div className="lg:w-1/3 text-white">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-black font-bold">
            <span className="text-xs">Save Up To</span>
            <span className="text-3xl">60%</span>
          </div>

          <span className="inline-block mt-4 bg-red-500 text-xs px-2 py-1 rounded">
            Mega Sale
          </span>

          <h2 className="text-2xl font-semibold mt-3">
            Your Favorite Electronics <br /> Now at Lower Prices
          </h2>

          <div className="flex gap-3 mt-6">
            <div className="bg-white text-black px-4 py-2 rounded-lg font-medium">
              MEGA30
            </div>
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold">
              Shop Now
            </button>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="lg:w-2/3 relative">
          <Swiper
            loop={true} // 🔥 infinite
            spaceBetween={16}
            slidesPerView={1.2}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                {/* CARD */}
                <div className="bg-white rounded-xl p-4 relative h-full">

                  {/* Discount */}
                  {item.discount && (
                    <span className="absolute top-3 left-3 bg-yellow-300 text-xs px-2 py-1 rounded">
                      {item.discount}
                    </span>
                  )}

                  {/* Exclusive (ABSOLUTE) */}
                  {item.tag && (
                    <span className="absolute bottom-3 left-3
                                     text-[11px] font-medium
                                     bg-purple-100 text-purple-700
                                     px-2 py-1 rounded-md shadow">
                      {item.tag}
                    </span>
                  )}

                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-40 object-contain mb-3"
                  />

                  <p className="text-xs text-gray-500">{item.category}</p>
                  <h3 className="font-medium text-sm">{item.title}</h3>

                  <div className="flex gap-2 items-center mt-1">
                    <span className="font-semibold">{item.price}</span>
                    {item.oldPrice && (
                      <span className="line-through text-gray-400 text-sm">
                        {item.oldPrice}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-green-600 mt-1">● In Stock</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* RIGHT ARROW ONLY */}
          <button
            onClick={() => swiperRef.current.slideNext()}
            className="absolute top-1/2 -right-4 -translate-y-1/2
                       bg-white w-10 h-10 rounded-full shadow
                       flex items-center justify-center z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}