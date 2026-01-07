import { Outlet } from "react-router-dom";
import Navbar from "../pages/common/Navbar";
import Footer from "../pages/common/Footer";

const MainLayout = () => (
  <div className="mx-14">
    <Navbar />
    <main>
      <Outlet />
    </main>{" "}
    {/* Yahan Home/About render honge */}
    <Footer />
  </div>
);

export default MainLayout;
