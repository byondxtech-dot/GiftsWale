import React from "react";
import Carousel from "./HomepageComponents/Carousel";
import MultiProduct from "./HomepageComponents/MultiProduct";
import SwiperSlider from "./HomepageComponents/CardSlider";
import ProductSwiper from "./HomepageComponents/ProductSwiper";
import Engraved from "./HomepageComponents/Engraved";
import ShopBrand from "./HomepageComponents/ShopBrand";
import BestOffer from "./HomepageComponents/Bestoffer";
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
