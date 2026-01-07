import { useState, useMemo } from "react";

/* ================= DATA ================= */
const PRODUCTS = Array.from({ length: 36 }).map((_, i) => ({
  id: i + 1,
  title: `Small Child Toy ${i + 1}`,
  category: ["Toys", "Headphones", "Headsets"][i % 3],
  price: 300 + i * 25,
  stock: i % 5 !== 0, // true / false
  color: ["Beige", "Black", "Blue"][i % 3],
  image: `https://picsum.photos/seed/${i}/300/420`,
}));

export default function Products() {
  const [sort, setSort] = useState("az");
  const [price, setPrice] = useState(949);
  const [page, setPage] = useState(1);

  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [stock, setStock] = useState({
    in: false,
    out: false,
  });

  const [open, setOpen] = useState({
    availability: true,
    color: true,
    category: true,
    price: true,
  });

  const perPage = 8;

  /* ================= FILTER + SORT ================= */
  const filtered = useMemo(() => {
    let data = [...PRODUCTS];

    // PRICE
    data = data.filter((p) => p.price <= price);

    // COLOR
    if (colors.length) {
      data = data.filter((p) => colors.includes(p.color));
    }

    // CATEGORY
    if (categories.length) {
      data = data.filter((p) => categories.includes(p.category));
    }

    // ✅ STOCK (FINAL FIX)
    if (stock.in || stock.out) {
      data = data.filter((p) => {
        if (stock.in && p.stock) return true;
        if (stock.out && !p.stock) return true;
        return false;
      });
    }

    // SORT
    if (sort === "az") data.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") data.sort((a, b) => b.title.localeCompare(a.title));

    return data;
  }, [sort, price, colors, categories, stock]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const show = filtered.slice((page - 1) * perPage, page * perPage);

  /* ================= HANDLERS ================= */
  const toggleColor = (c) => {
    setPage(1);
    setColors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const toggleCategory = (c) => {
    setPage(1);
    setCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="bg-gray-100 px-6 py-8">
        <p className="text-sm text-gray-500">Home › Products</p>
        <h1 className="text-3xl font-semibold mt-2">Products</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ================= LEFT FILTER ================= */}
        <aside className="space-y-6 text-sm">

          {/* AVAILABILITY */}
          <Filter
            title="Availability"
            open={open.availability}
            toggle={() =>
              setOpen({ ...open, availability: !open.availability })
            }
          >
            <Check
              label="In stock"
              checked={stock.in}
              onChange={() => {
                setPage(1);
                setStock((s) => ({ ...s, in: !s.in }));
              }}
            />

            <Check
              label="Out of stock"
              checked={stock.out}
              onChange={() => {
                setPage(1);
                setStock((s) => ({ ...s, out: !s.out }));
              }}
            />
          </Filter>

          {/* COLOR */}
          <Filter
            title="Color"
            open={open.color}
            toggle={() => setOpen({ ...open, color: !open.color })}
          >
            {["Beige", "Black", "Blue"].map((c) => (
              <label key={c} className="flex justify-between items-center">
                <span className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={colors.includes(c)}
                    onChange={() => toggleColor(c)}
                  />
                  {c}
                </span>
                 <span className="text-gray-400 text-xs">
               ({PRODUCTS.filter((p) => p.color === c).length})
                  </span>
                </label>
            ))}
          </Filter>

          {/* CATEGORY */}
          <Filter
            title="Category"
            open={open.category}
            toggle={() => setOpen({ ...open, category: !open.category })}
          >
            {["Toys", "Headphones", "Headsets"].map((c) => (
              <label key={c} className="flex justify-between items-center">
                <span className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={categories.includes(c)}
                    onChange={() => toggleCategory(c)}
                  />
                  {c}
                </span>
                <span className="text-gray-400 text-xs">
  ({PRODUCTS.filter((p) => p.category === c).length})
</span>
              
              </label>
            ))}
          </Filter>

          {/* PRICE */}
          <Filter
            title="Price"
            open={open.price}
            toggle={() => setOpen({ ...open, price: !open.price })}
          >
            <p className="mb-2">₹0 – ₹{price}</p>
            <input
              type="range"
              min="0"
              max="949"
              value={price}
              onChange={(e) => {
                setPrice(+e.target.value);
                setPage(1);
              }}
              className="w-full"
            />
          </Filter>
        </aside>

        {/* ================= RIGHT PRODUCTS ================= */}
        <section className="lg:col-span-3">
          {/* SORT BAR */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <p>{filtered.length} Results</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="az">Alphabetically, A–Z</option>
              <option value="za">Alphabetically, Z–A</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {show.map((p) => (
              <div key={p.id} className="text-sm">
                <div className="relative border rounded-3xl overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-56 w-full object-cover bg-gray-100"
                  />
                  {!p.stock && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 rounded">
                      Out of stock
                    </span>
                  )}
                </div>

                <p className="mt-3 text-gray-500">{p.category}</p>
                <p className="font-medium">{p.title}</p>

                <p>
                  ₹{p.price}{" "}
                  <span className="line-through text-gray-400">
                    ₹{p.price + 200}
                  </span>
                </p>

                <p className="text-xs mt-1 text-gray-600">
                  ● {p.color} • {p.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  page === i + 1
                    ? "bg-black text-white"
                    : "border text-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {/* BOTTOM CATEGORY CARDS */}
<div className="mt-16">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
    {[
      { title: "Birthday Gift", img: "https://picsum.photos/seed/g1/200/200" },
      { title: "Anniversary Gift", img: "https://picsum.photos/seed/g2/200/200" },
      { title: "Kids Toys", img: "https://picsum.photos/seed/g3/200/200" },
      { title: "Home Decor", img: "https://picsum.photos/seed/g4/200/200" },
      { title: "Special Offer", img: "https://picsum.photos/seed/g5/200/200" },
    ].map((item, i) => (
      <div key={i} className="text-center">
        <div className="h-32 rounded-3xl border bg-gray-50 overflow-hidden flex items-center justify-center">
          <img
            src={item.img}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 text-sm font-medium">{item.title}</p>
      </div>
    ))}
  </div>
</div>
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Filter = ({ title, open, toggle, children }) => (
  <div>
    <button
      onClick={toggle}
      className="w-full flex justify-between items-center font-medium mb-3"
    >
      {title}
      <span
        className={`transition-transform ${
          open ? "rotate-180" : ""
        }`}
      >
        ⌄
      </span>
    </button>
    {open && <div className="space-y-2">{children}</div>}
  </div>
);

const Check = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);