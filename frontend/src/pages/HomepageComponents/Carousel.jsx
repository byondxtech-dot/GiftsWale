import { useEffect, useState, useRef } from "react";

const slides = [
  {
    title: "Loh Aa Gayi Lohri Ve!",
    description: "Discover festive gifts to welcome the harvest season",
    buttonText: "ORDER NOW",
    buttonLink: "/lohri-gifts",
    image: "https://picsum.photos/400/400?random=1",
    bgColor: "from-rose-50 via-white to-amber-50",
  },
  {
    title: "Birthday Surprises!",
    description: "Make their special day unforgettable with perfect gifts",
    buttonText: "SHOP NOW",
    buttonLink: "/birthday-gifts",
    image: "https://picsum.photos/400/400?random=2",
    bgColor: "from-blue-50 via-white to-purple-50",
  },
  {
    title: "Anniversary Specials",
    description: "Celebrate love with our curated gift collection",
    buttonText: "EXPLORE",
    buttonLink: "/anniversary-gifts",
    image: "https://picsum.photos/400/400?random=3",
    bgColor: "from-pink-50 via-white to-rose-50",
  },
  {
    title: "Fresh Flowers",
    description: "Beautiful blooms delivered fresh to your doorstep",
    buttonText: "ORDER NOW",
    buttonLink: "/flowers",
    image: "https://picsum.photos/400/400?random=4",
    bgColor: "from-green-50 via-white to-emerald-50",
  },
  {
    title: "Delicious Cakes",
    description: "Handcrafted cakes for every celebration",
    buttonText: "SHOP CAKES",
    buttonLink: "/cakes",
    image: "https://picsum.photos/400/400?random=5",
    bgColor: "from-orange-50 via-white to-amber-50",
  },
  {
    title: "Corporate Gifts",
    description: "Premium gifting solutions for your business needs",
    buttonText: "GET STARTED",
    buttonLink: "/corporate-gifts",
    image: "https://picsum.photos/400/400?random=6",
    bgColor: "from-slate-50 via-white to-gray-50",
  },
];

export default function Carousel() {
  const visible = 2.5;
  const total = slides.length;

  const sliderItems = [
    ...slides.slice(-visible),
    ...slides,
    ...slides.slice(0, visible),
  ];

  const [index, setIndex] = useState(visible);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // 🔁 Start autoplay
  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
  };

  // ⏸ Pause autoplay
  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // 🔁 Infinite loop fix
  useEffect(() => {
    if (index === total + visible) {
      setTimeout(() => {
        setTransition(false);
        setIndex(visible);
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(total);
      }, 500);
    }
  }, [index, total, visible]);

  // Re-enable transition
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  return (
    <div
      className="relative w-full overflow-hidden mt-4"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div
        ref={sliderRef}
        className={`flex ${transition ? "transition-transform duration-500 ease-in-out" : ""
          }`}
        style={{
          transform: `translateX(-${index * (100 / visible)}%)`,
        }}
      >
        {sliderItems.map((slide, i) => (
          <div key={i} className="w-full md:w-[45%] lg:w-[40%] flex-shrink-0 px-2">
            <div
              className="h-[280px] md:h-[340px] lg:h-[400px] rounded-2xl overflow-hidden relative"
            >
              {/* Full Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-3">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed max-w-[220px]">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonLink}
                  className="inline-flex items-center justify-center bg-[#5c6b4a] hover:bg-[#4a5a3a] text-white font-semibold text-sm px-6 py-3 rounded-full w-fit transition-colors"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ⬅ Back */}
      <button
        onClick={() => setIndex((prev) => prev - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors text-xl font-light"
      >
        ‹
      </button>

      {/* ➡ Forward */}
      <button
        onClick={() => setIndex((prev) => prev + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors text-xl font-light"
      >
        ›
      </button>
    </div>
  );
}
