import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const brands = [
  { name: "ADATA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/ADATA_logo.svg/1280px-ADATA_logo.svg.png" },
  { name: "TOYS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Toys_%22R%22_Us_logo.svg/1024px-Toys_%22R%22_Us_logo.svg.png" },
  { name: "Muno", logo: "https://picsum.photos/200/100?random=1" },
  { name: "LULU'S", logo: "https://picsum.photos/200/100?random=2" },
  { name: "aerna", logo: "https://picsum.photos/200/100?random=3" },
  { name: "kiwi", logo: "https://picsum.photos/200/100?random=4" },
  { name: "Brand 7", logo: "https://picsum.photos/200/100?random=5" },
  { name: "Brand 8", logo: "https://picsum.photos/200/100?random=6" },
];

export default function ShopBrand() {
  return (
    <div className="w-full px-4 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Shop by Brands</h2>
        <a href="/brands" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          View All
        </a>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="brand-slider"
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center gap-3 bg-white border border-gray-100 rounded-xl h-24 p-4 hover:shadow-md transition-shadow cursor-pointer group">
              {/* <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              /> */}
              <span className="text-lg font-bold text-gray-400 group-hover:text-gray-900 transition-colors uppercase tracking-wider">
                {brand.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .brand-slider .swiper-button-prev,
        .brand-slider .swiper-button-next {
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #f3f4f6;
        }
        .brand-slider .swiper-button-prev:after,
        .brand-slider .swiper-button-next:after {
          font-size: 14px;
          font-weight: bold;
          color: #374151;
        }
        .brand-slider .swiper-button-prev:hover,
        .brand-slider .swiper-button-next:hover {
          background: #f9fafb;
        }
        .brand-slider .swiper-button-prev {
          left: -5px;
        }
        .brand-slider .swiper-button-next {
          right: -5px;
        }
      `}</style>
    </div>
  );
}
