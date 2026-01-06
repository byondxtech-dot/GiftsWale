import React from "react";
import './index.css';
import Home from './home/Home.jsx';
import About  from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Customize from './pages/Customize.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Product from './pages/Product.jsx';
import Checkout from './pages/Checkout.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
    <About />
    <Product />
    <Customize />
    <ProductDetail />
    <Checkout />
  <Footer />
    </div>
  );
};

export default App;