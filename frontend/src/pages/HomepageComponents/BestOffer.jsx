import React from "react";
import { Copy, Flame } from "lucide-react";

export default function BestOffer() {
  return (
    <div className="w-full px-4 lg:px-8 py-10">
      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Best Offers</h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT BIG CARD */}
        <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden group">
          {/* Background Image */}
          <img
            src="https://picsum.photos/800/600?random=tech"
            alt="Main Tech Offer"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
            <Flame size={12} fill="white" />
            MEGA SALE
          </div>

          <div className="absolute top-4 right-4 z-10 bg-yellow-400 p-3 rounded-xl shadow-lg flex flex-col items-center">
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-800">
              <span className="bg-black text-white px-1 rounded">-5%</span>
              <span className="line-through opacity-60">$68.00</span>
            </div>
            <div className="text-xl font-black text-gray-900 leading-none mt-1">$48.50</div>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-2">Save on the Tech You Love</h3>
            <p className="text-sm opacity-90 mb-6 max-w-sm">
              Take 5% off all electronics with code MEGA30 — small discount, big value.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200">
                <span className="text-gray-900 font-bold text-sm tracking-wider">MEGA30</span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Copy size={16} />
                </button>
              </div>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-2.5 rounded-xl transition-colors shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE SECTION */}
        <div className="flex flex-col gap-5">

          {/* Top Two Small Cards */}
          <div className="grid grid-cols-2 gap-5">
            {/* Orange Card */}
            <div className="relative h-[240px] rounded-2xl bg-[#d35400] overflow-hidden p-6 group">
              <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-gray-900 text-[10px] font-bold px-2 py-1 rounded">
                -5%
              </div>
              <h3 className="text-white text-lg font-bold leading-tight relative z-10 max-w-[120px]">
                Best-Selling Wall Art
              </h3>
              {/* Abstract Images at bottom */}
              <div className="absolute bottom-0 right-0 left-0 h-1/2 flex items-end justify-center gap-2 px-4 translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                <img src="https://picsum.photos/200/200?random=art1" className="w-20 h-28 object-cover rounded shadow-lg border-2 border-white rotate-[-5deg]" alt="art1" />
                <img src="https://picsum.photos/200/200?random=art2" className="w-20 h-28 object-cover rounded shadow-lg border-2 border-white rotate-[5deg]" alt="art2" />
              </div>
            </div>

            {/* Blue Card */}
            <div className="relative h-[240px] rounded-2xl bg-[#9ec4e5] overflow-hidden p-6 group">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                <Flame size={10} fill="white" />
                MEGA SALE
              </div>
              <h3 className="text-gray-900 text-lg font-bold leading-tight relative z-10 max-w-[120px]">
                Find Your Perfect Sound
              </h3>
              {/* Speaker image */}
              <div className="absolute bottom-0 right-0 w-32 translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <img src="https://picsum.photos/300/300?random=speaker" className="w-full" alt="speaker" />
              </div>
            </div>
          </div>

          {/* Bottom Wide Card */}
          <div className="relative flex-1 min-h-[240px] rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>

            <div className="relative h-full flex flex-col justify-center p-8 text-white z-10">
              <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-3">
                BEST SELLER
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-6 max-w-xs">
                Fantasy Books with Exclusive Discounts
              </h3>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-2.5 rounded-xl transition-colors w-fit shadow-lg">
                Shop Now
              </button>
            </div>

            {/* Floating Badges and Images */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-4">
              {/* 1+1=3 badge */}
              <div className="absolute -left-16 bottom-0 z-20 bg-green-600 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl rotate-12 group-hover:scale-110 transition-transform">
                <span className="text-white text-3xl font-black">3</span>
              </div>

              <div className="flex items-center -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <img src="https://picsum.photos/250/350?random=book1" className="w-24 lg:w-32 rounded-lg shadow-2xl border-white border-2 -mr-16 relative z-10" alt="book1" />
                <img src="https://picsum.photos/250/350?random=book2" className="w-24 lg:w-32 rounded-lg shadow-2xl border-white border-2" alt="book2" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
