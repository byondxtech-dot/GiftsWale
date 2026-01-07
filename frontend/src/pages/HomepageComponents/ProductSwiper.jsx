import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    img: "https://picsum.photos/400/500?1",
    discount: "-31%",
    category: "Electronics",
    title: "StreamBook Air Ultra",
    price: 749.00,
    oldPrice: 1100.00,
    stock: true,
    badge: "Best Seller",
    badgeColor: "bg-blue-500",
  },
  {
    img: "https://picsum.photos/400/500?2",
    discount: null,
    category: "Art",
    title: '"Leafy Tree" Wall Print',
    price: 39.00,
    oldPrice: null,
    stock: true,
    badge: null,
    badgeColor: null,
  },
  {
    img: "https://picsum.photos/400/500?3",
    discount: null,
    category: "Electronics",
    title: "Trackline Sport Edition",
    price: 149.00,
    oldPrice: null,
    stock: true,
    badge: null,
    badgeColor: null,
  },
  {
    img: "https://picsum.photos/400/500?4",
    discount: null,
    category: "Vinyl Records",
    title: "After Dark Reflections",
    price: 23.99,
    oldPrice: null,
    stock: true,
    badge: null,
    badgeColor: null,
  },
  {
    img: "https://picsum.photos/400/500?5",
    discount: "-24%",
    category: "Books",
    title: "Success by Mary Bier",
    price: 18.99,
    oldPrice: 25.00,
    stock: true,
    badge: "🔥 Mega Sale",
    badgeColor: "bg-orange-500",
  },
  {
    img: "https://picsum.photos/400/500?6",
    discount: "-13%",
    category: "Electronics",
    title: "Audio Dot Pro",
    price: 68.00,
    oldPrice: 79.00,
    stock: true,
    badge: "New",
    badgeColor: "bg-gray-800",
  },
  {
    img: "https://picsum.photos/400/500?7",
    discount: "-15%",
    category: "Home Decor",
    title: "Modern Table Lamp",
    price: 45.00,
    oldPrice: 53.00,
    stock: true,
    badge: null,
    badgeColor: null,
  },
  {
    img: "https://picsum.photos/400/500?8",
    discount: "-20%",
    category: "Fashion",
    title: "Classic Leather Watch",
    price: 120.00,
    oldPrice: 150.00,
    stock: true,
    badge: "Trending",
    badgeColor: "bg-purple-500",
  },
  {
    img: "https://picsum.photos/400/500?9",
    discount: null,
    category: "Gaming",
    title: "Pro Gaming Headset",
    price: 89.00,
    oldPrice: null,
    stock: true,
    badge: null,
    badgeColor: null,
  },
  {
    img: "https://picsum.photos/400/500?10",
    discount: "-10%",
    category: "Kitchen",
    title: "Smart Coffee Maker",
    price: 199.00,
    oldPrice: 220.00,
    stock: true,
    badge: "Hot",
    badgeColor: "bg-red-500",
  },
];

export default function ProductSwiper() {
  return (
    <div className="w-full px-4 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Top Products</h2>
        <a href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Shop All
        </a>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1.5 },
          480: { slidesPerView: 2.3 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="top-products-slider"
      >
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="space-y-3">
              {/* IMAGE CARD */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group">
                {/* Discount Badge */}
                {item.discount && (
                  <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {item.discount}
                  </span>
                )}

                {/* Special Badge */}
                {item.badge && (
                  <span className={`absolute bottom-3 left-3 z-10 ${item.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded group-hover:bottom-14 transition-all duration-300`}>
                    {item.badge}
                  </span>
                )}

                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Quick View Button - Appears on Hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-3 transition-colors">
                    Quick View
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="text-sm space-y-1">
                <p className="text-gray-500 text-xs">{item.category}</p>

                <h3 className="font-medium text-gray-800 line-clamp-1">{item.title}</h3>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-600">${item.price.toFixed(2)}</span>
                  {item.oldPrice && (
                    <span className="line-through text-gray-400 text-xs">
                      ${item.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {item.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .top-products-slider {
          position: relative;
          padding: 0 10px;
        }
        .top-products-slider .swiper-button-prev,
        .top-products-slider .swiper-button-next {
          width: 44px;
          height: 44px;
          background: white;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
          top: 45%;
          transform: translateY(-50%);
        }
        .top-products-slider .swiper-button-prev {
          left: 0;
        }
        .top-products-slider .swiper-button-next {
          right: 0;
        }
        .top-products-slider .swiper-button-prev:after,
        .top-products-slider .swiper-button-next:after {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }
        .top-products-slider .swiper-button-prev:hover,
        .top-products-slider .swiper-button-next:hover {
          background: #f9fafb;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
          transform: translateY(-50%) scale(1.05);
        }
        .top-products-slider .swiper-button-disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
