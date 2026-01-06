import React, { useState } from "react";
import {
  RotateCcw,
  Package,
  MessageCircle,
  DollarSign,
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
    <div className="p-6 max-w-7xl mx-auto space-y-14">

      {/* TOP SUPPORT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <RotateCcw />,
            title: "Returns & Exchanges",
            text: "Not happy? Return or exchange your items quickly and hassle-free.",
          },
          {
            icon: <Package />,
            title: "Check Your Order Status",
            text: "Stay updated every step of the way — from purchase to delivery.",
          },
          {
            icon: <MessageCircle />,
            title: "Visit Our Support Center",
            text: "Need assistance? Find answers and support anytime, anywhere.",
          },
          {
            icon: <DollarSign />,
            title: "Price-Match Guarantee",
            text: "Found a better price? We’ll match it so you get the best deal.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="border rounded-xl p-6 text-center space-y-3"
          >
            <div className="flex justify-center text-gray-700">
              {item.icon}
            </div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.text}</p>
            <button className="text-sm font-medium underline">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* FAQ + SUPPORT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* LEFT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            24/7 Assistance, Whenever You Need It
          </h2>
          <p className="text-gray-500">
            Round-the-clock support for a smooth shopping experience.
          </p>
          <button className="px-5 py-2 bg-gray-100 rounded-lg font-medium">
            Contact Support
          </button>
        </div>

        {/* RIGHT FAQ */}
        <div className="space-y-6">
          <p className="text-xs font-semibold text-gray-400">SHIPPING</p>

          {faqs.slice(0, 4).map((q, i) => (
            <div
              key={i}
              className="border-b pb-3 cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{q}</p>
                <ChevronDown
                  className={`transition ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          ))}

          <p className="text-xs font-semibold text-gray-400 mt-6">
            RETURNS & REFUND
          </p>

          {faqs.slice(4).map((q, i) => (
            <div
              key={i + 4}
              className="border-b pb-3 cursor-pointer"
              onClick={() => setOpen(open === i + 4 ? null : i + 4)}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{q}</p>
                <ChevronDown
                  className={`transition ${
                    open === i + 4 ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          ))}

          <button className="text-sm font-medium underline mt-2">
            Read All
          </button>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="bg-gray-100 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            Join the Gifts Wale and Get 10% Off Your First Order!
          </h3>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border"
          />
          <button className="px-6 py-2 bg-yellow-400 rounded-lg font-semibold">
            Sign Up
          </button>
        </div>
      </div>

    </div>
  );
}