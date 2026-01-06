import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    img: "https://picsum.photos/400/500?1",
    title: "Fresh Roses Bouquet",
    discount: "-20%",
  },
  {
    img: "https://picsum.photos/400/500?2",
    title: "Chocolate Cake",
    discount: "-35%",
  },
  {
    img: "https://picsum.photos/400/500?3",
    title: "Birthday Gift Box",
    discount: "-15%",
  },
  {
    img: "https://picsum.photos/400/500?4",
    title: "Indoor Plants",
    discount: "-25%",
  },
  {
    img: "https://picsum.photos/400/500?5",
    title: "Personalised Mug",
    discount: "-10% ",
  },
];

export default function SwiperSlider() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        navigation
        loop
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            {/* Card */}
            <div className="relative h-[380px] rounded-2xl overflow-hidden group">
              
              {/* Discount Badge */}
              <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {item.discount}
              </span>

              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Title */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <h3 className="text-white font-semibold text-sm line-clamp-2">
                  {item.title}
                </h3>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}