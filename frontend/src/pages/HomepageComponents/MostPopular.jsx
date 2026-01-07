import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Heart, ShoppingCart, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    img: "https://picsum.photos/400/500?random=pop1",
    discount: "-12%",
    category: "Home Decor",
    title: "Elegant Glass Flower Vase",
    price: 85.00,
    oldPrice: 97.00,
    rating: 4.9,
    reviews: 245,
    badge: "Most Popular",
    badgeColor: "bg-blue-600",
  },
  {
    img: "https://picsum.photos/400/500?random=pop2",
    discount: null,
    category: "Jewelry",
    title: "Silver Heart Necklace",
    price: 120.00,
    oldPrice: null,
    rating: 5.0,
    reviews: 182,
    badge: "Best Gift",
    badgeColor: "bg-pink-500",
  },
  {
    img: "https://picsum.photos/400/500?random=pop3",
    discount: "-20%",
    category: "Office",
    title: "Leather Bound Journal",
    price: 32.00,
    oldPrice: 40.00,
    rating: 4.8,
    reviews: 95,
    badge: "Staff Pick",
    badgeColor: "bg-orange-500",
  },
  {
    img: "https://picsum.photos/400/500?random=pop4",
    discount: null,
    category: "Fragrance",
    title: "Midnight Orchid Perfume",
    price: 65.00,
    oldPrice: null,
    rating: 4.7,
    reviews: 312,
    badge: "Top Seller",
    badgeColor: "bg-purple-600",
  },
  {
    img: "https://picsum.photos/400/500?random=pop5",
    discount: "-5%",
    category: "Kitchen",
    title: "Marble Mortar & Pestle",
    price: 45.00,
    oldPrice: 48.00,
    rating: 4.6,
    reviews: 54,
    badge: null,
    badgeColor: null,
  },
  {
    img: "https://picsum.photos/400/500?random=pop6",
    discount: null,
    category: "Fashion",
    title: "Cashmere Scarf - Winter Edition",
    price: 89.00,
    oldPrice: null,
    rating: 4.9,
    reviews: 88,
    badge: "Exclusive",
    badgeColor: "bg-emerald-600",
  },
];

export default function MostPopular() {
  return (
    <div className="w-full px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Most Popular</h2>
          <p className="text-gray-500 mt-1">Discover what everyone is loving right now</p>
        </div>
        <a href="/popular" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1 group">
          Browse All
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.4 },
          480: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 5.2 },
        }}
        className="popular-slider pb-4"
      >
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="group flex flex-col h-full bg-white rounded-2xl p-3 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300">
              {/* IMAGE SECTION */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-50">
                {/* Sale Badge */}
                {item.discount && (
                  <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">
                    {item.discount}
                  </span>
                )}

                {/* Tag Badge */}
                {item.badge && (
                  <span className={`absolute top-2 right-2 z-10 ${item.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                    {item.badge}
                  </span>
                )}

                {/* Actions Icons */}
                <div className="absolute right-2 top-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-md hover:bg-gray-900 hover:text-white transition-all">
                    <Heart size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-md hover:bg-gray-900 hover:text-white transition-all">
                    <ShoppingCart size={16} />
                  </button>
                </div>

                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Quick View Button */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 font-bold text-xs py-2.5 rounded-lg shadow-lg hover:bg-gray-900 hover:text-white transition-all">
                    QUICK VIEW
                  </button>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="mt-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest mb-1">
                  {item.category}
                </span>

                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[40px] leading-tight">
                  {item.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <div className="flex items-center gap-0.5 text-yellow-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-900">{item.rating}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">({item.reviews})</span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-gray-900">${item.price.toFixed(2)}</span>
                    {item.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">${item.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button className="text-gray-900 hover:text-blue-600 transition-colors">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .popular-slider .swiper-button-prev,
        .popular-slider .swiper-button-next {
          width: 44px;
          height: 44px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #f1f5f9;
          top: 40%;
        }
        .popular-slider .swiper-button-prev:after,
        .popular-slider .swiper-button-next:after {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
        }
        .popular-slider .swiper-button-disabled {
          opacity: 0;
        }
        .popular-slider .swiper-button-prev { left: -10px; }
        .popular-slider .swiper-button-next { right: -10px; }
      `}</style>
    </div>
  );
}
