import { useEffect, useState, useRef } from "react";

const images = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
  "https://picsum.photos/600/400?random=5",
  "https://picsum.photos/600/400?random=6",
];

export default function Carousel() {
  const visible = 3;
  const total = images.length;

  const sliderImages = [
    ...images.slice(-visible),
    ...images,
    ...images.slice(0, visible),
  ];

  const [index, setIndex] = useState(visible);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // 🔁 Start autoplay
  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
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
      onMouseEnter={stopAutoplay}   // ⏸ Pause on hover
      onMouseLeave={startAutoplay}  // ▶ Resume on leave
    >
      <div
        ref={sliderRef}
        className={`flex ${
          transition ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * (100 / visible)}%)`,
        }}
      >
        {sliderImages.map((img, i) => (
          <div
            key={i}
            className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
          >
            <div className="h-[220px] md:h-[260px] lg:h-[300px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={img}
                alt={`Slide ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ⬅ Back */}
      <button
        onClick={() => setIndex((prev) => prev - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow w-10 h-10 rounded-full"
      >
        ‹
      </button>

      {/* ➡ Forward */}
      <button
        onClick={() => setIndex((prev) => prev + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow w-10 h-10 rounded-full"
      >
        ›
      </button>
    </div>
  );
}