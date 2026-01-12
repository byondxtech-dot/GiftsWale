import { useState, useMemo } from "react";
import { useProducts } from "../Context/HomeContext";

export default function Products() {
  /* ================= CONTEXT DATA ================= */
  const { products, loading } = useProducts();

  /* ================= STATES ================= */
  const [sort, setSort] = useState("az");
  const [price, setPrice] = useState(5000);
  const [page, setPage] = useState(1);

  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState({ in: false, out: false });

  const [open, setOpen] = useState({
    availability: true,
    color: true,
    category: true,
    price: true,
  });

  const perPage = 8;

  /* ================= FILTER + SORT ================= */
  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let data = [...products];

    // PRICE
    data = data.filter((p) => Number(p.price) <= price);

    // COLOR
    if (colors.length) data = data.filter((p) => colors.includes(p.color));

    // CATEGORY
    if (categories.length)
      data = data.filter((p) => categories.includes(p.category));

    // STOCK
    if (stock.in || stock.out) {
      data = data.filter((p) => {
        if (stock.in && p.stock === true) return true;
        if (stock.out && p.stock === false) return true;
        return false;
      });
    }

    // SORT
    if (sort === "az") data.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") data.sort((a, b) => b.title.localeCompare(a.title));

    return data;
  }, [products, sort, price, colors, categories, stock]);

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

  if (loading)
    return <p className="text-center mt-20">Loading products...</p>;

  /* ================= UI ================= */
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-100 px-6 py-8">
        <p className="text-sm text-gray-500">Home › Products</p>
        <h1 className="text-3xl font-semibold mt-2">Products</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT FILTER */}
        <aside className="space-y-6 text-sm">
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
                setStock({ ...stock, in: !stock.in });
              }}
            />
            <Check
              label="Out of stock"
              checked={stock.out}
              onChange={() => {
                setPage(1);
                setStock({ ...stock, out: !stock.out });
              }}
            />
          </Filter>

          <Filter
            title="Color"
            open={open.color}
            toggle={() => setOpen({ ...open, color: !open.color })}
          >
            {["Beige", "Black", "Blue"].map((c) => (
              <Check
                key={c}
                label={c}
                checked={colors.includes(c)}
                onChange={() => toggleColor(c)}
              />
            ))}
          </Filter>

          <Filter
            title="Category"
            open={open.category}
            toggle={() => setOpen({ ...open, category: !open.category })}
          >
            {["Toys", "Headphones", "Headsets"].map((c) => (
              <Check
                key={c}
                label={c}
                checked={categories.includes(c)}
                onChange={() => toggleCategory(c)}
              />
            ))}
          </Filter>

          <Filter
            title="Price"
            open={open.price}
            toggle={() => setOpen({ ...open, price: !open.price })}
          >
            <p>₹0 – ₹{price}</p>
            <input
              type="range"
              min="0"
              max="5000"
              value={price}
              onChange={(e) => {
                setPrice(+e.target.value);
                setPage(1);
              }}
              className="w-full"
            />
          </Filter>
        </aside>

        {/* RIGHT PRODUCTS */}
        <section className="lg:col-span-3">
          <div className="flex justify-between mb-6">
            <p>{filtered.length} Results</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {show.map((p) => (
              <div key={p._id || p.id} className="text-sm">
                <div className="relative border rounded-2xl overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-56 w-full object-cover"
                  />
                  {p.stock === false && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 rounded">
                      Out of stock
                    </span>
                  )}
                </div>

                <p className="mt-2 text-gray-500">{p.category}</p>
                <p className="font-medium">{p.title}</p>
                <p>₹{p.price}</p>
                <p className="text-xs text-gray-600">
                  {p.color} • {p.stock ? "In Stock" : "Out of Stock"}
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
        </section>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
const Filter = ({ title, open, toggle, children }) => (
  <div>
    <button
      onClick={toggle}
      className="w-full flex justify-between mb-2 font-medium"
    >
      {title} <span>{open ? "⌃" : "⌄"}</span>
    </button>
    {open && <div className="space-y-2">{children}</div>}
  </div>
);

const Check = ({ label, checked, onChange }) => (
  <label className="flex gap-2 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);