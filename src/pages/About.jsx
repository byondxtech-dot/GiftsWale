import React from "react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">

      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold">
            About Our Store
          </h1>
          <p className="text-gray-600">
            We are committed to delivering high-quality products at the best
            prices, ensuring a smooth and enjoyable shopping experience for
            everyone.
          </p>
          <p className="text-gray-600">
            From trending electronics to daily essentials, we carefully curate
            products that bring value, trust, and satisfaction.
          </p>
        </div>

        <div className="h-72 bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src="https://picsum.photos/600/400"
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {[
          { title: "10K+", label: "Happy Customers" },
          { title: "500+", label: "Products" },
          { title: "99%", label: "Positive Reviews" },
          { title: "24/7", label: "Support" },
        ].map((item, i) => (
          <div key={i} className="border rounded-xl p-6">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-gray-500 text-sm">{item.label}</p>
          </div>
        ))}
      </section>

      {/* WHY CHOOSE US */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Quality Products",
              text: "Only trusted and quality-checked products."
            },
            {
              title: "Fast Delivery",
              text: "Quick and reliable shipping nationwide."
            },
            {
              title: "Secure Payments",
              text: "100% safe and encrypted transactions."
            },
            {
              title: "Easy Returns",
              text: "Hassle-free returns & exchanges."
            },
          ].map((item, i) => (
            <div key={i} className="border rounded-xl p-6 text-center">
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-gray-100 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our mission is to make online shopping simple, affordable, and
          trustworthy by providing top-notch products, transparent pricing,
          and outstanding customer service.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">
          Ready to Start Shopping?
        </h2>
        <p className="text-gray-600">
          Explore our wide range of products and find what you love.
        </p>
        <button className="px-6 py-3 bg-black text-white rounded-lg">
          Shop Now
        </button>
      </section>

    </div>
  );
}