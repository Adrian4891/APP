import { useEffect, useState } from "react";
import CarouselHome from "../../components/carouselHome/CarouselHome";
import Baner from "../../components/baner/Baner";
import Offers from "../../components/offers/Offers";
import Products from "../../components/products/Products";
import ShopInfo from "../../components/shopInfo/ShopInfo";
import Loader from "../../components/loader/Loader";
import PaymentsMethods from "../../components/paymentsMethods/PaymentsMethods";
import LoaderProduct from "../../components/loaderProduct/LoaderProduct";

const Home = ({load, handleLoader, products}) => {
 
  useEffect(()=>{
    handleLoader();
  },[]);

  if(load)
  return (
    <Loader/>
  );

  return (
    <> 
      <CarouselHome/>
      <Baner/>
      { products.length > 0 ? <Offers/> : <LoaderProduct/>}
      <PaymentsMethods/>
      { products.length > 0 ? <Products/> : <LoaderProduct/>}
      <ShopInfo/>
    </>
  );
}

export default Home;