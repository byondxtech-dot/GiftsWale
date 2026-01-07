import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../assets/lgo file giftswale.jpg";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <a href="/" className="inline-block">
              <img
                src={logo}
                alt="Gifts Wale"
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm">
              Your one-stop destination for premium gifts, electronics, and unique office essentials. We bring quality and joy to every corner of your life.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium">support@giftswale.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-medium">+91 98765 43210</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {[
                { icon: <Facebook size={20} />, label: "Facebook" },
                { icon: <Instagram size={20} />, label: "Instagram" },
                { icon: <Twitter size={20} />, label: "Twitter" },
                { icon: <Youtube size={20} />, label: "Youtube" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Group - 3 Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Shop Categories */}
            <div>
              <h4 className="text-gray-900 font-bold text-lg mb-6 uppercase tracking-wider text-sm">Categories</h4>
              <ul className="space-y-4">
                {["Laptops", "Smart Watches", "Headphones", "Gift Boxes", "Office Decor", "Gaming Gear"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-gray-900 font-bold text-lg mb-6 uppercase tracking-wider text-sm">Our Company</h4>
              <ul className="space-y-4">
                {["About Gifts Wale", "Latest News", "Careers", "Gift Cards", "Affiliate Program", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-gray-900 font-bold text-lg mb-6 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-4">
                {["Shipping Policy", "Returns & Refunds", "Terms of Service", "Privacy Policy", "Cookie Policy", "Help Center"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100"></div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>© 2026 Gifts Wale. All Rights Reserved.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Cookies</a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4 md:h-5 w-auto" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6 md:h-8 w-auto" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-4 md:h-5 w-auto" alt="Paypal" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" className="h-5 md:h-6 w-auto" alt="Apple Pay" />
          </div>
        </div>

      </div>
    </footer>
  );
}
