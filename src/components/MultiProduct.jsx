const categories = [
  {
    title: "Anniversary Gifts",
    image: "https://picsum.photos/100?1",
  },
  {
    title: "Birthday Gifts",
    image: "https://picsum.photos/100?2",
  },
  {
    title: "Birthday Cakes",
    image: "https://picsum.photos/100?3",
  },
  {
    title: "New Offers",
    image: "https://picsum.photos/100?4",
  },
  {
    title: "Anniversary Gifts",
    image: "https://picsum.photos/100?5",
  },
  {
    title: "Birthday Gifts",
    image: "https://picsum.photos/100?6",
  },
  {
    title: "Birthday Cakes",
    image: "https://picsum.photos/100?7",
  },
];

export default function MultiProduct() {
  return (
    <div className="w-full bg-white">
      
      {/* 🔹 HEADING */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between">
        <h2 className="text-lg sm:text-2xl font-semibold">
          New Products & Offers
        </h2>
        <button className="text-sm text-pink-600 font-medium">
          View All
        </button>
      </div>

      {/* 🔹 CATEGORY ROW */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4">

          {/* Horizontal Scroll */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide md:justify-center">
            {categories.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[90px]"
              >
                {/* Image Box */}
                <div className="w-20 h-20 sm:w-31 sm:h-31 rounded-xl overflow-hidden border bg-gray-100 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                {/* Text */}
                <p className="text-[11px] sm:text-sm mt-2 text-center font-medium">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}