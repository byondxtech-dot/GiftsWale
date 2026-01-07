import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Heart, ShoppingCart, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    img: "https://picsum.photos/400/500?random=eng1",
    discount: "-15%",
    category: "Engraved Leather",
    title: "Classic Personalized Leather Watch",
    price: 145.00,
    oldPrice: 175.00,
    rating: 4.9,
    reviews: 56,
    badge: "Bestseller",
    badgeColor: "bg-orange-600",
  },
  {
    img: "https://picsum.photos/400/500?random=eng2",
    discount: "-10%",
    category: "Engraved Wood",
    title: "Hand-Carved Wooden Keepsake Box",
    price: 55.00,
    oldPrice: 65.00,
    rating: 4.8,
    reviews: 32,
    badge: "Custom",
    badgeColor: "bg-blue-600",
  },
  {
    img: "https://picsum.photos/400/500?random=eng3",
    discount: null,
    category: "Metalwork",
    title: "Engraved Titanium Flask",
    price: 35.00,
    oldPrice: null,
    rating: 4.7,
    reviews: 18,
    badge: "New",
    badgeColor: "bg-purple-600",
  },
  {
    img: "https://picsum.photos/400/500?random=eng4",
    discount: "-20%",
    category: "Accessories",
    title: "Personalized Men's Compass",
    price: 42.00,
    oldPrice: 52.00,
    rating: 4.6,
    reviews: 45,
    badge: null,
    badgeColor: null,
  },
  {
    img: "https://picsum.photos/400/500?random=eng5",
    discount: null,
    category: "Home",
    title: "Engraved Bamboo Cutting Board",
    price: 28.00,
    oldPrice: null,
    rating: 4.5,
    reviews: 24,
    badge: "Trending",
    badgeColor: "bg-red-600",
  },
];

export default function Engraved() {
  return (
    <div className="w-full px-4 lg:px-8 py-12 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 underline decoration-blue-500 underline-offset-8">Engraved Collection</h2>
        <a href="/engraved" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1 group">
          View Collection
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* LEFT PROMO BANNER */}
        <div className="w-full lg:w-[494px] lg:min-w-[494px] h-[400px] lg:h-[442px] rounded-2xl overflow-hidden bg-gray-900 relative flex-shrink-0 group">
          <img
            src="https://picsum.photos/600/800?random=engpromo"
            alt="Engraved Promo"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-8">
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded w-fit mb-4">
              Premium Quality
            </span>
            <h3 className="text-white text-3xl lg:text-4xl font-bold leading-tight mb-4">
              Eternal Memories<br />in Leather
            </h3>
            <p className="text-gray-300 text-sm mb-6 max-w-xs">
              Personalize your gifts with precision engraving that lasts a lifetime.
            </p>
            <a
              href="/engraved"
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm px-8 py-3.5 rounded-full w-fit transition-all hover:shadow-lg"
            >
              Start Personalizing
            </a>
          </div>
        </div>

        {/* RIGHT PRODUCT SLIDER */}
        <div className="flex-1 min-w-0">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1.4 },
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 3.2 }, // Adjusted for larger banner
            }}
            className="engraved-slider"
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
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
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
        </div>
      </div>

      <style>{`
        .engraved-slider .swiper-button-prev,
        .engraved-slider .swiper-button-next {
          width: 44px;
          height: 44px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #f1f5f9;
          top: 40%;
        }
        .engraved-slider .swiper-button-prev:after,
        .engraved-slider .swiper-button-next:after {
          font-size: 16px;
          font-weight: 900;
          color: #0f172a;
        }
        .engraved-slider .swiper-button-disabled {
          opacity: 0;
        }
        .engraved-slider .swiper-button-prev { left: -10px; }
        .engraved-slider .swiper-button-next { right: -10px; }
      `}</style>
    </div>
  );
}
