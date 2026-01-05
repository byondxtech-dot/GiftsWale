import React from "react";
import {
  Search,
  ShoppingCart,
  ArrowDown,
  User,
  Menu,
} from "lucide-react";

const Navbar = () => {
  const categories = [
    "All",
    "Cakes",
    "Flowers",
    "Plants",
    "Personalised",
    "Birthday",
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm ">
      
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        
        {/* Left */}
        <div className="flex items-center gap-8">

          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Aakash
          </h1>
          
              <div className="border-2 rounded flex gap-4 p-2">
                 <Menu  size={22}className ="cursor-pointer text-black-600 " />
                 <p className="text-black-600 text-[16px]">Menu</p>
                 
              </div>
        </div>
              {  /*        <Menu className="md:hidden cursor-pointer text-gray-600" />*/}
              

        {/* Search */}
        <div className="hidden md:flex items-center w-[70%] bg-gray-50 border rounded pl-2 py-4 shadow-inner pr-8 ml-9 h-12">
          <div className=" flex w-[160px] gap-4 pr-5">
                      <a href="#" className="text-black-500 text-[13px] mt-2">All Product </a>
          <ArrowDown size={32} className=" text-black-700 mt-1"/>
          <div className="border-1 h-10"></div>
          </div>

          <input
            type="text"
            placeholder="Search for anything"
            className="w-90 bg-transparent px-3 outline-none text-xl"
          />
          <Search size={40} className="text-black-500 " />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 mx-4 mr-4">
          <div>
          <User  size={24} className="cursor-pointer text-gray-700 hover:text-green-600 transition" />
          <p>login</p>
          </div>

          <div className="relative">
            <ShoppingCart size={24}className="cursor-pointer text-gray-700 hover:text-green-600 transition" />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1.5 rounded-full">
              2
            </span>
            <p>cart</p>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="flex items-center bg-gray-50 border rounded-full px-4 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search gifts"
            className="w-full bg-transparent px-3 outline-none text-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <nav className="flex gap-6 px-4 md:px-10 py-3 text-sm font-semibold border-t overflow-x-auto whitespace-nowrap">
        <span>sale</span>
        <span>gift <select className=" ml-[-15px] text-xl mt-[-6px]">
          <option></option>
          <option>a</option>
          <option>b</option>        
        </select></span>
        <span>gift1
         <select className=" ml-[-15px] text-xl mt-[-6px]">
          <option></option>
          <option>a</option>
          <option>b</option>        
        </select></span>
        <span>gift2</span>
         <span>gift3</span>
          <span>Deals
           <select className=" ml-[-15px] text-xl mt-[-6px]">
          <option></option>
          <option>a</option>
          <option>b</option>        
        </select></span>
           <span>More
           <select className=" ml-[-15px] text-xl mt-[-6px]">
          <option></option>
          <option>a</option>
          <option>b</option>        
        </select> </span>
        <div className=" flex gap-6 ml-42">
          <span>currency[INR ₹]
           <select className=" ml-[-15px] text-xl mt-[-6px] outline-none">
          <option></option>
          <option>a</option>
          <option>b</option>        
        </select> </span>
        <span>language
           <select className=" ml-[-15px] text-xl mt-[-6px]">
          <option></option>
          <option>a</option>
          <option>b</option>        
        </select> </span>
        <span>dark mode
           <select className=" ml-[-15px] text-xl mt-[-6px]">
          <option></option>
          <option>a</option>
          <option>b</option>        
        </select> </span>
        </div>
        {/*categories.map((item, index) => (
          <span
            key={index}
            className="relative cursor-pointer text-gray-700 hover:text-green-600 transition
            after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px]
            after:bg-green-600 after:transition-all hover:after:w-full"
          >
            {item}
          </span>
        ))*/}
      </nav>
    </header>
  );
};

export default Navbar;