import React, { useState } from "react";
import { Search, ShoppingCart, ChevronDown, User, Menu } from "lucide-react";
import Logo from "../../assets/lgo file giftswale.jpg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All products");

  const categories = [
    "All products",
    "Cakes",
    "Flowers",
    "Plants",
    "Personalised",
    "Birthday",
    "Anniversary",
    "Gifts",
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* Main Navbar */}
      <div className="flex items-center px-4 lg:px-8 py-4 gap-5">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={Logo}
            alt="GiftsWale"
            className="h-12 w-auto object-contain"
          />
        </a>

        {/* Menu Button */}
        <button className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-md hover:bg-gray-800 transition-colors flex-shrink-0">
          <Menu size={18} />
          <span className="font-medium text-base">Menu</span>
        </button>

        {/* Search Bar  */}
        <div className="hidden md:flex max-w-3xl items-center border border-gray-300 rounded-sm overflow-hidden bg-white">
          {/* Category Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <span className="text-base text-gray-700 whitespace-nowrap">
                {selectedCategory}
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for anything..."
            className="flex-1 px-6 py-3 outline-none text-base text-gray-600 placeholder-gray-400 min-w-[500px]"
          />

          {/* Search Icon */}
          <button className="px-4 py-2.5 hover:bg-gray-50 transition-colors flex-shrink-0">
            <Search size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Spacer */}
        <div className="hidden md:flex flex-1"></div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 mr-6">
          <a
            href="/catalog"
            className="text-gray-700 hover:text-gray-900 font-medium text-base transition-colors"
          >
            Catalog
          </a>
          <a
            href="/orders"
            className="text-gray-700 hover:text-gray-900 font-medium text-base transition-colors"
          >
            Orders
          </a>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {/* Login */}
          <a
            href="/login"
            className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <User size={24} strokeWidth={1.5} />
            <span className="text-xs font-medium">Login</span>
          </a>

          {/* Cart */}
          <a
            href="/cart"
            className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart size={24} strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
            <span className="text-xs font-medium">Cart</span>
          </a>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Menu size={22} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search for anything..."
            className="flex-1 px-4 py-2.5 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button className="px-4 py-2.5 hover:bg-gray-50 transition-colors">
            <Search size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
