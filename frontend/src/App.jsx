import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/admin/Dashboard";
import Analytics from "./pages/admin/Analytics";

import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";
import Payment from "./pages/admin/Payment";
import Enquiry from "./pages/admin/Enquiry";
import Marketing from "./pages/admin/Marketing";
import User from "./pages/admin/User";
import AdminProducts from "./pages/admin/Products";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;
function App() {
  return (
    <>
      <div>
        <Routes>
          {/* --- PUBLIC ROUTES (With Main Navbar & Footer) --- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Products />} />
          </Route>

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />{" "}
            {/* /admin par ye khulega */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="setting" element={<Settings />} />
            <Route path="payment" element={<Payment />} />
            <Route path="enquiry" element={<Enquiry />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="user" element={<User />} />
          </Route>

          {/* --- 404 NOT FOUND --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
