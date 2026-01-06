import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() { return ( <section className="max-w-7xl mx-auto px-4 py-16"> {/* Header */} <div className="text-center max-w-2xl mx-auto mb-12"> <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1> <p className="text-gray-500"> We’d love to hear from you. Whether you have a question about products, orders, or support — our team is ready to help. </p> </div>

{/* Contact Info Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    <InfoCard icon={<Phone />} title="Phone" value="+91 98765 43210" />
    <InfoCard icon={<Mail />} title="Email" value="support@giftswale.com" />
    <InfoCard icon={<MapPin />} title="Address" value="New Delhi, India" />
    <InfoCard icon={<Clock />} title="Working Hours" value="24/7 Support" />
  </div>

  {/* Form + Map */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    {/* Contact Form */}
    <div className="bg-white shadow rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
      <form className="space-y-5">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Order ID (optional)</label>
          <input
            type="text"
            placeholder="e.g. #GW12345"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Send Message
        </button>
      </form>
    </div>

    {/* Map / Image Placeholder */}
    <div className="bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
      Google Map / Store Image
    </div>
  </div>

  {/* Help Section */}
  <div className="mt-20 bg-gray-50 rounded-2xl p-8 text-center">
    <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
    <p className="text-gray-500 mb-4">
      Visit our Help Center or check your order status anytime.
    </p>
    <div className="flex justify-center gap-4">
      <button className="px-6 py-2 border rounded-lg hover:bg-gray-100">
        Help Center
      </button>
      <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
        Track Order
      </button>
    </div>
  </div>
</section>

); }

function InfoCard({ icon, title, value }) { return ( <div className="border rounded-xl p-6 text-center bg-white hover:shadow-md transition"> <div className="flex justify-center mb-3 text-gray-700">{icon}</div> <h4 className="font-semibold mb-1">{title}</h4> <p className="text-sm text-gray-500">{value}</p> </div> ); }