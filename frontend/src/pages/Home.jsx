import React from "react";
import Carousel from "./HomepageComponents/Carousel.jsx";
import MultiProduct from "./HomepageComponents/MultiProduct.jsx";
import SwiperSlider from "./HomepageComponents/CardSlider";
import ProductSwiper from "./HomepageComponents/ProductSwiper";
import Engraved from "./HomepageComponents/Engraved";
import ShopBrand from "./HomepageComponents/ShopBrand";
import BestOffer from "./HomepageComponents/BestOffer";
import TrendingProducts from "./HomepageComponents/TrendingProduct";
import ElectronicsOffer from "./HomepageComponents/ElectronicsOffer";
import MostPopular from "./HomepageComponents/MostPopular";
import SupportSection from "./HomepageComponents/SupportSection";

const Home = () => {
  return (
    <>
      <Carousel />
      <MultiProduct />
      <SwiperSlider />
      <ProductSwiper />
      <Engraved />
      <ShopBrand />
      <BestOffer />
      <TrendingProducts />
      <ElectronicsOffer />
      <MostPopular />
      <SupportSection />
    </>
  );
};

export default Home;
