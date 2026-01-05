import { useState } from "react";

// EXACT WORKING VERSION (no fake overlay, real image switching)

const BASE_PRICE = 120;

const DATA = { black: { 7: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png", 8: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5822.png", 9: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5826.png", }, red: { 7: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5828.png", 8: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5830.png", 9: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5832.png", }, };

export default function CustomShoe() { const [color, setColor] = useState("black"); const [size, setSize] = useState(7); const [qty, setQty] = useState(1);

const price = BASE_PRICE * qty;

return ( <div className="min-h-screen bg-[#fbf7e9] flex items-center justify-center p-4"> <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl p-8"> <p className="text-center text-sm text-gray-500 mb-6">Custom shoe</p>

<div className="grid md:grid-cols-2 gap-12 items-center">
      {/* IMAGE */}
      <div className="flex justify-center">
        <img
          src={DATA[color][size]}
          alt="shoe"
          className="w-[420px] object-contain"
        />
      </div>

      {/* RIGHT PANEL */}
      <div>
        <h2 className="text-2xl font-semibold mb-1">Custom Shoe</h2>
        <p className="text-gray-500 mb-6">₹{price}</p>

        {/* COLOR */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex gap-3">
            {Object.keys(DATA).map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === c ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* SIZE */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex gap-3">
            {[7, 8, 9].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 border rounded-md ${
                  size === s ? "bg-black text-white" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* QTY */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-2">Quantity</p>
          <div className="flex items-center border w-fit">
            <button
              className="px-4"
              onClick={() => setQty(Math.max(1, qty - 1))}
            >
              -
            </button>
            <span className="px-6">{qty}</span>
            <button className="px-4" onClick={() => setQty(qty + 1)}>
              +
            </button>
          </div>
        </div>

        <button className="w-full border border-black py-3 mb-3 font-medium">
          Add to cart
        </button>
        <button className="w-full bg-black text-white py-3 font-medium">
          Buy it now
        </button>
      </div>
    </div>
  </div>
</div>

); }