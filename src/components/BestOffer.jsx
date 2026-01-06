import React from "react";

export default function BestOffer() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-gray-800 text-lg font-semibold mb-4">
        Best Offers
      </h1>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Left Big Card */}
        <div className="w-full lg:w-1/2 h-72 border rounded-2xl bg-gray-100"></div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          
          {/* Top Small Cards */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2 h-32 border rounded-2xl bg-gray-100"></div>
            <div className="w-full sm:w-1/2 h-32 border rounded-2xl bg-gray-100"></div>
          </div>

          {/* Bottom Wide Card */}
          <div className="w-full h-36 border rounded-2xl bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}