import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <img
            src="B.png"   // apna logo yaha
            alt="Gifts Wale"
            className="h-10 mb-4"
          />
          <p className="text-gray-600 text-sm leading-relaxed">
            Shop everything you need — from electronics to everyday
            essentials, books, vinyls, and posters — all in one place.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-gray-700">
            <Twitter className="w-5 h-5 cursor-pointer hover:text-black" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-black" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-black" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Laptops</li>
            <li>Smart Watches</li>
            <li>Headphones</li>
            <li>Books</li>
            <li>Art</li>
            <li>Music</li>
            <li>Projectors</li>
            <li>Speakers</li>
          </ul>
        </div>

        {/* Get to Know Us */}
        <div>
          <h4 className="font-semibold mb-4">Get to Know Us</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>About Us</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-4">Let Us Help You</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Help & FAQs</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Policy</li>
            <li>Returns Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          
          <div className="flex items-center gap-4">
            <span>© 2026 Gifts Wale</span>
         <span>currency[INR ₹]
          <select className=" rounded px-2 py-1 text-sm outline-none ml-[-55px]">
             <option></option>
              <option>INR ₹</option>
              <option>USD $</option>
            </select></span>
  <span> language<select className=" rounded px-2 py-1 text-sm outline-none ml-[-25px]">
              <option></option>
              <option>a</option>
            </select></span>
           
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            <img src="/B.png" className="h-6" />
            <img src="B.png" className="h-6" />
            <img src="B.png" className="h-6" />
            <img src="/B.png" className="h-6" />
            <img src="/B.png" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}