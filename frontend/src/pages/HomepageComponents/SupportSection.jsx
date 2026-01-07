import React, { useState } from "react";
import {
  Undo2,
  Box,
  MessageCircle,
  CircleDollarSign,
  ChevronDown,
} from "lucide-react";

export default function SupportSection() {
  const [open, setOpen] = useState(null);

  const faqs = [
    "How long does it typically take to process an order?",
    "Can I change the contents of my order?",
    "Do you ship internationally?",
    "Is my personal information secure during checkout?",
    "What is your return policy?",
    "How long does it take to process a refund?",
  ];

  return (
    <div className="w-full px-4 lg:px-8 py-16 bg-white space-y-24">
      {/* TOP SUPPORT CARDS - CLEAN MODERN STYLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Undo2 size={24} strokeWidth={1} />,
            title: "Returns & Exchanges",
            text: "Not happy? Return or exchange your items quickly and hassle-free.",
          },
          {
            icon: <Box size={24} strokeWidth={1} />,
            title: "Check Your Order Status",
            text: "Stay updated every step of the way — from purchase to delivery.",
          },
          {
            icon: <MessageCircle size={24} strokeWidth={1} />,
            title: "Visit Our Support Center",
            text: "Need assistance? Find answers and support anytime, anywhere.",
          },
          {
            icon: <CircleDollarSign size={24} strokeWidth={1} />,
            title: "Price-Match Guarantee",
            text: "Found a better price? We’ll match it so you get the best deal.",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-gray-300 rounded-xl p-8 text-center flex flex-col items-center group hover:border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="mb-6 text-gray-900">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {item.text}
            </p>
            <button className="mt-auto text-sm font-black text-gray-900 hover:text-blue-600 transition-colors uppercase tracking-wider">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* FAQ + SUPPORT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            24/7 Assistance, Whenever You Need It
          </h2>
          <p className="text-gray-500 text-lg">
            Our dedicated team is always here to ensure your shopping journey is smooth and pleasant.
          </p>
          <div className="pt-4">
            <button className="px-10 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl">
              Contact Support
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (FAQ) */}
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase mb-6">Common Questions</p>
            <div className="space-y-4">
              {faqs.map((q, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 pb-4 cursor-pointer group"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex justify-between items-center py-2">
                    <p className={`font-bold transition-colors ${open === i ? "text-blue-600" : "text-gray-900 group-hover:text-gray-600"}`}>
                      {q}
                    </p>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${open === i ? "rotate-180 text-blue-600" : "text-gray-400"}`}
                    />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      We offer detailed tracking and a hassle-free process. Our support team responds within 24 hours for any specific queries.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 text-sm font-black text-gray-900 hover:text-blue-600 transition-colors underline decoration-gray-300 underline-offset-8">
              Read All Documentation
            </button>
          </div>
        </div>
      </div>

      {/* NEWSLETTER SECTION - SPLIT LAYOUT PREMIUM STYLE */}
      <div className="relative overflow-hidden bg-[#f3f4f6] rounded-[24px] flex flex-col lg:flex-row items-stretch min-h-[400px]">
        {/* LEFT CONTENT - FORM AREA */}
        <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center">
          {/* Logo/Brand in Newsletter */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <CircleDollarSign size={24} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">Gifts Wale</span>
          </div>

          <div className="max-w-md">
            <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8 leading-tight">
              Join the Gifts Wale and Get <span className="text-blue-600">10% Off</span> Your First Order!
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 w-full mb-4">
              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 px-5 py-4 rounded-xl border-none bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm font-medium text-gray-900"
              />
              <button className="px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-black transition-all shadow-md active:scale-95 whitespace-nowrap">
                Sign Up
              </button>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed">
              By clicking on the "Sign Up" button, I confirm my agreement with the{" "}
              <a href="#" className="text-gray-900 font-bold underline">Privacy Policy</a> and{" "}
              <a href="#" className="text-gray-900 font-bold underline">Terms of Use</a>
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT - LIFESTYLE IMAGE */}
        <div className="hidden lg:block w-1/2 relative min-h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1544117518-2b46abc8add9?q=80&w=2070&auto=format&fit=crop"
            alt="Lifestyle Smartwatch"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay for smooth transition if needed */}
          <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-[#f3f4f6] via-transparent to-transparent w-24"></div>
        </div>
      </div>
    </div>
  );
}
