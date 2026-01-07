import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight, ChevronLeft, Flame, Copy } from "lucide-react";

import "swiper/css";

const products = [
  {
    img: "https://picsum.photos/400/500?random=watch",
    discount: "-14%",
    tag: "Exclusive",
    category: "Electronics",
    title: "Pulse Watch S2",
    price: "$129.00",
    oldPrice: "$150.00",
  },
  {
    img: "https://picsum.photos/400/500?random=headset",
    category: "Electronics",
    title: "Gaming Headset X20",
    price: "$69.00",
  },
  {
    img: "https://picsum.photos/400/500?random=speaker",
    category: "Electronics",
    title: "ClipGo Travel Speaker",
    price: "$59.00",
  },
  {
    img: "https://picsum.photos/400/500?random=earbuds",
    category: "Electronics",
    title: "Sonic Buds Pro",
    price: "$49.00",
    oldPrice: "$69.00",
  },
];

export default function ElectronicsOffer() {
  const swiperRef = useRef(null);

  const copyCode = () => {
    navigator.clipboard.writeText("MEGA30");
    alert("Code MEGA30 copied!");
  };

  return (
    <div className="w-full px-4 lg:px-8 py-10">
      <div className="relative overflow-hidden group bg-[#2d2a26] rounded-3xl min-h-[460px] flex items-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-[#4a3f2f]/30 to-[#1a1815] z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-10 p-8 lg:p-12">

          {/* LEFT CONTENT SECTION */}
          <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* BIG DISCOUNT STICKER */}
            <div className="relative mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-black border-4 border-white shadow-2xl transform -rotate-12 transition-transform group-hover:rotate-0 duration-500">
                <span className="text-[12px] md:text-sm font-bold uppercase tracking-tight">Save Up to</span>
                <div className="flex items-start">
                  <span className="text-4xl md:text-6xl font-black">60</span>
                  <span className="text-xl md:text-2xl font-bold mt-1 md:mt-2">%</span>
                </div>
                {/* Sticker Peel Effect */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/40 rounded-full blur-[2px]"></div>
              </div>
            </div>

            {/* MEGA SALE BADGE */}
            <div className="flex items-center gap-2 bg-red-600 text-white text-[10px] md:text-[11px] font-black px-2.5 py-1.5 rounded-md mb-4 w-fit">
              <Flame size={14} fill="white" />
              MEGA SALE
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">
              Your Favorite Electronics Now at Lower Prices
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-sm">
              Save 60% on the latest electronics—just use code <span className="text-white font-bold underline decoration-yellow-400">MEGA30</span> at checkout.
            </p>

            {/* CODE BOX AND BUTTON */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
              <div className="flex items-center bg-white rounded-xl px-5 py-3 shadow-xl flex-1 max-w-[200px] justify-between">
                <span className="text-gray-900 font-black text-sm tracking-widest">MEGA30</span>
                <button onClick={copyCode} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Copy size={18} />
                </button>
              </div>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black px-8 py-3.5 rounded-xl transition-all shadow-xl hover:scale-105 active:scale-95 text-sm uppercase">
                Shop Now
              </button>
            </div>
          </div>

          {/* RIGHT PRODUCT SLIDER SECTION */}
          <div className="w-full lg:w-3/5 relative">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={20}
              slidesPerView={1.2}
              loop={true}
              breakpoints={{
                480: { slidesPerView: 1.8 },
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3 },
              }}
              className="electronics-offer-slider"
            >
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-[24px] p-5 h-full border border-gray-100/10 shadow-lg group/card hover:shadow-2xl transition-all duration-300">
                    <div className="relative mb-4 aspect-square rounded-2xl overflow-hidden bg-gray-50 p-2 flex items-center justify-center">
                      {/* Badge */}
                      {item.discount && (
                        <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-1 rounded">
                          {item.discount}
                        </div>
                      )}

                      {/* Image */}
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-500"
                      />

                      {/* Exclusive Bottom Badge */}
                      {item.tag && (
                        <div className="absolute bottom-2 left-2 z-10 bg-[#8b5cf6] text-white text-[10px] font-bold px-3 py-1 rounded-md">
                          {item.tag}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-black text-red-600">
                          {item.price}
                        </span>
                        {item.oldPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {item.oldPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-[10px] font-bold text-green-600">In Stock</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center z-20 text-gray-900 hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center z-20 text-gray-900 hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
