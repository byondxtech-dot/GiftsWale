import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const products = [
  {
    img: "https://picsum.photos/400/500?1",
    discount: "-5%",
    category: "Toys",
    title: "Small Child Toy",
    price: 1000,
    oldPrice: 2000,
    stock: true,
  },
  {
    img: "https://picsum.photos/400/500?2",
    discount: "-5%",
    category: "Toys",
    title: "Small Child Toy",
    price: 1000,
    oldPrice: 2000,
    stock: true,
  },
  {
    img: "https://picsum.photos/400/500?3",
    discount: "-5%",
    category: "Toys",
    title: "Small Child Toy",
    price: 1000,
    oldPrice: 2000,
    stock: true,
  },
  {
    img: "https://picsum.photos/400/500?4",
    discount: "-5%",
    category: "Toys",
    title: "Small Child Toy",
    price: 1000,
    oldPrice: 2000,
    stock: true,
  },
  {
    img: "https://picsum.photos/400/500?5",
    discount: "-5%",
    category: "Toys",
    title: "Small Child Toy",
    price: 1000,
    oldPrice: 2000,
    stock: true,
  },
];

export default function ProductSwiper() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-6">Top Products</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        loop
        slidesPerGroup={1}
        loopFillGroupWithBlank
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="space-y-3">

              {/* IMAGE CARD */}
              <div className="relative h-[380px] rounded-2xl overflow-hidden border bg-gray-100">

                {/* Discount */}
                <span className="absolute top-3 left-3 z-10 bg-yellow-300 text-xs font-semibold px-2 py-1 rounded">
                  {item.discount}
                </span>

                {/* Bestseller */}
                <span className="absolute bottom-3 left-3 z-10 border border-gray-700 bg-white/90 text-xs px-3 py-1 rounded">
                  Bestseller
                </span>

                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* INFO */}
              <div className="text-sm space-y-1">
                <p className="text-gray-500">{item.category}</p>

                <h3 className="font-medium line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">₹{item.price}</span>
                  <span className="line-through text-gray-400 text-xs">
                    ₹{item.oldPrice}
                  </span>
                </div>

                <p className="text-xs text-gray-600">
                  ● {item.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>
{/* BOTTOM PRODUCT IMAGES FROM ARRAY */}
<div className="flex w-full gap-5 mt-6 flex-col md:flex-row">

  {products.slice(0, 2).map((item, index) => (
    <div
      key={index}
      className="
        border rounded-[22px] w-full md:w-1/2 
        h-[200px] md:h-[300px] lg:h-[360px]
        overflow-hidden
      "
    >
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    </div>
  ))}

</div>
              </div>
  );
}