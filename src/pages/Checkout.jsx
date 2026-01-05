import { useState } from "react";

export default function Checkout() {
  const [payment, setPayment] = useState("online");

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* SHIPPING ADDRESS */}
            <div className="border rounded-xl p-4">
              <h2 className="font-semibold mb-4">Shipping Information</h2>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 border border-indigo-500 bg-indigo-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Home</p>
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">
                      Default
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-5">
                    ADMIN <br />
                    New Delhi, Delhi <br />
                    110025
                  </p>
                </div>

                <div className="flex-1 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500 cursor-pointer">
                  + Use New Address
                </div>
              </div>
            </div>

            {/* SHIPPING FORM */}
            <div className="border rounded-xl p-4">
              <h2 className="font-semibold mb-4">Shipping Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name *" value="ADMIN" />
                <Input label="Email Address *" value="admin@giftshop.com" type="email" />
                <Input label="Phone (WhatsApp)" value="9876543210" />
                <Input label="Address *" value="New Delhi" />
                <Input label="City *" value="Delhi" />
                <Input label="State *" value="Delhi" />
                <Input label="ZIP Code *" value="110025" />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="border rounded-xl p-4">
              <h2 className="font-semibold mb-4">Payment Method</h2>

              <PaymentOption
                active={payment === "online"}
                onClick={() => setPayment("online")}
                title="Pay Online (Cashfree)"
                desc="UPI, Credit/Debit Cards, Net Banking"
              />

              <PaymentOption
                active={payment === "cod"}
                onClick={() => setPayment("cod")}
                title="Cash on Delivery"
                desc="Pay when you receive your order"
              />

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" defaultChecked />
                <span className="text-sm text-gray-700">
                  Same as shipping address
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="border rounded-xl p-4 h-fit">
            <h2 className="font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm text-gray-700">
              <Row title="GiftShala Customized Photo Frame" price="₹600.00" />
              <Row title="Custom Photo Canvas Print" price="₹249.99" />

              <hr />

              <Row title="Subtotal" price="₹849.99" />
              <Row title="Shipping" price="FREE" green />
              <Row title="Tax" price="₹52.00" />

              <hr />

              <Row title="Total" price="₹701.99" bold />
            </div>

            <button className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl">
              Place Order
            </button>

            <p className="text-xs text-center text-gray-500 mt-2">
              Your payment information is secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Reusable Components ===== */

const Input = ({ label, value, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      defaultValue={value}
      className="w-full border rounded-lg px-3 py-2 text-sm
      focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
    />
  </div>
);

const PaymentOption = ({ active, onClick, title, desc }) => (
  <label
    onClick={onClick}
    className={`flex gap-3 border rounded-xl p-3 mb-3 cursor-pointer ${
      active ? "border-indigo-500 bg-indigo-50" : ""
    }`}
  >
    <input type="radio" checked={active} readOnly />
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  </label>
);

const Row = ({ title, price, green, bold }) => (
  <div
    className={`flex justify-between ${
      green ? "text-green-600" : ""
    } ${bold ? "font-semibold text-base" : ""}`}
  >
    <span>{title}</span>
    <span>{price}</span>
  </div>
);