const categories = [
  {
    title: "Birthday",
    image: "https://picsum.photos/200?1",
  },
  {
    title: "Lohri Gifts",
    image: "https://picsum.photos/200?2",
  },
  {
    title: "Flowers",
    image: "https://picsum.photos/200?3",
  },
  {
    title: "Cakes",
    image: "https://picsum.photos/200?4",
  },
  {
    title: "Same Day Delivery",
    image: "https://picsum.photos/200?5",
  },
  {
    title: "Luxe",
    image: "https://picsum.photos/200?6",
  },
  {
    title: "Corporate Gifts",
    image: "https://picsum.photos/200?7",
  },
  {
    title: "Balloon Decor",
    image: "https://picsum.photos/200?8",
  },
  {
    title: "Special Gifts",
    image: "https://picsum.photos/200?9",
  },
];

export default function MultiProduct() {
  return (
    <div className="w-full bg-white py-8">
      {/* Category Grid - Full Width */}
      <div className="w-full px-4 lg:px-8">
        {/* Horizontal Scroll on mobile, Full width grid on desktop */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-9 md:gap-4 lg:gap-6">
          {categories.map((item, index) => (
            <a
              href={`/category/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="flex flex-col items-center min-w-[110px] md:min-w-0 cursor-pointer group"
            >
              {/* Card with gradient border effect */}
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-2xl overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Category Name */}
              <p className="text-sm sm:text-base mt-3 text-center font-medium text-gray-700 group-hover:text-gray-900 transition-colors leading-tight">
                {item.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

