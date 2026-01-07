import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    img: "https://picsum.photos/300/400?1",
    title: "Smart Style",
    badge: null,
    bgColor: "bg-gray-200",
  },
  {
    img: "https://picsum.photos/300/400?2",
    title: "Vinyl Picks",
    badge: "-5%",
    bgColor: "bg-amber-200",
  },
  {
    img: "https://picsum.photos/300/400?3",
    title: "Best Earbuds, Loved by All",
    badge: "Best Seller",
    bgColor: "bg-blue-400",
  },
  {
    img: "https://picsum.photos/300/400?4",
    title: "Hot Book Deals",
    badge: "-25%",
    bgColor: "bg-amber-100",
  },
  {
    img: "https://picsum.photos/300/400?5",
    title: "Headphone Hits",
    badge: "-5%",
    bgColor: "bg-pink-100",
  },
  {
    img: "https://picsum.photos/300/400?6",
    title: "Large Screen TV's for Total Comfort",
    badge: null,
    bgColor: "bg-gray-100",
  },
  {
    img: "https://picsum.photos/300/400?7",
    title: "This Season's Best in Art & Decor",
    badge: "-5%",
    bgColor: "bg-teal-200",
  },
  {
    img: "https://picsum.photos/300/400?8",
    title: "Turn Up the Season with a New Speaker",
    badge: "🔥 Mega Sale",
    bgColor: "bg-gray-300",
  },
];

export default function SwiperSlider() {
  return (
    <div className="w-full px-4 lg:px-8 py-8">
      {/* Section Header */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        New Products and Current Offers
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        navigation
        loop
        breakpoints={{
          0: { slidesPerView: 2.3 },
          480: { slidesPerView: 3.5 },
          640: { slidesPerView: 4.5 },
          768: { slidesPerView: 5.5 },
          1024: { slidesPerView: 6.5 },
          1280: { slidesPerView: 7.5 },
        }}
        className="product-slider"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            {/* Card */}
            <a
              href="#"
              className="block relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Full Background Image */}
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Badge */}
              {item.badge && (
                <span
                  className="absolute top-3 left-3 z-10 bg-yellow-300 text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm"
                >
                  {item.badge}
                </span>
              )}

              {/* Title at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-semibold text-xs md:text-sm leading-tight line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .product-slider .swiper-button-prev,
        .product-slider .swiper-button-next {
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .product-slider .swiper-button-prev:after,
        .product-slider .swiper-button-next:after {
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }
        .product-slider .swiper-button-prev:hover,
        .product-slider .swiper-button-next:hover {
          background: #f5f5f5;
        }
      `}</style>
    </div>
  );
}
