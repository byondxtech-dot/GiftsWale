import React from "react";
import Carousel from "../components/Carousel";
import MultiProduct from '../components/MultiProduct.jsx';
import CardSlider from '../components/CardSlider.jsx';
import Support from '../components/SupportSection.jsx';
import ShopBrand from '../components/ShopBrand.jsx';
import Engraved from '../components/Engraved.jsx';
import Trending from '../components/TrendingProduct.jsx';
import MostPopular from '../components/MostPopular.jsx';
import Electronics from '../components/ElectronicsOffer.jsx';
import BestOffer from '../components/BestOffer.jsx';
import ProductSwiper from '../components/ProductSwiper.jsx';


const Home = () => {
  return (
    <>
      
      <Carousel />
        <MultiProduct />
      <CardSlider />
      <ProductSwiper />
      <Engraved />
      <ShopBrand />
      <BestOffer />
      <Trending />
      <Electronics />
      <MostPopular />
      <Support />
    </>
  );
};

export default Home;