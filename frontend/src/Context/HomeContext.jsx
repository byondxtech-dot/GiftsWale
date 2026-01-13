import { createContext, useContext, useEffect, useState } from "react";
import baseUrl from "../services/ProductService.js";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await baseUrl.get("/products");
      setProducts(res.data?.products || res.data || []);
    } catch (err) {
      console.error("Product API error:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Proper custom hook (naming convention)
export const useProducts = () => useContext(ProductContext);