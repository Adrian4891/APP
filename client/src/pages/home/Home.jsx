import { useEffect } from "react";
import CarouselHome from "../../components/carouselHome/CarouselHome";
import Baner from "../../components/baner/Baner";
import Offers from "../../components/offers/Offers";
import Products from "../../components/products/Products";
import ShopInfo from "../../components/shopInfo/ShopInfo";
import Loader from "../../components/loader/Loader";
import PaymentsMethods from "../../components/paymentsMethods/PaymentsMethods";

const Home = ({load, handleLoader}) => {
 
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
      <Offers/>
      <PaymentsMethods/>
      <Products/>
      <ShopInfo/>
    </>
  );
}

export default Home;