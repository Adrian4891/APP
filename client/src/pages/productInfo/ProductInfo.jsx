import style from "./productInfo.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductOption from "../../components/productOptions/ProductOptions";
import ImageSelector from "../../components/imageSelector/ImageSelector";
import ProductDescription from "../../components/productDescription/ProductDescription";
import ProductQuestions from "../../components/productQuestions/ProductQuestions";
import Loader from "../../components/loader/Loader";
import ComentsAndScores from "../../components/comentsAndScores/ComentsAndScores";
import CarouselProduct from "../../components/carouselProduct/CarouselProduct";

const ProductInfo = ({load, handleLoader}) => {

   const { id } = useParams();
   const [ prodInfo, setProdInfo ] = useState({});
   const [ imgSelection , setImgSelection ] = useState(""); 
   const [ carouselHiden, setCarouselHiden ] = useState(false); 
   const [ count, setCount ] = useState(1);
 
   const getProductInfo = async () => {
      try {
         const { data } = await axios(`/products/${id}`);
         if(!data) throw Error("Algo salio mal");
         setProdInfo(data);
         setImgSelection(data.image)
        
      } catch (error) {
         console.log(error.message);
      }
   }

   const handleCount = (countParams) => {
      if(countParams === "increment"  && count < 4 ) setCount(count + 1);
      if(countParams === "increment" && count === 4) setCount(1);
      if(countParams === "decrement" && count > 1) setCount(count - 1);
   }
    
   useEffect(()=>{
      getProductInfo();
      handleLoader();
   },[]);

   if(load)
   return (
     <Loader/>
   );
 
   return(
      <>
         <div className={style.container}> 
            <CarouselProduct
              prodInfo={prodInfo}
              carouselHiden={carouselHiden}
              setCarouselHiden={setCarouselHiden}
              count={count}
              setCount={setCount}
              handleCount={handleCount}
            />
          
            <ImageSelector
               imgSelection={imgSelection}
               setImgSelection={setImgSelection}
               name={prodInfo.name}
               image={prodInfo.image}
               image2={prodInfo.image2}
               image3={prodInfo.image3}
               image4={prodInfo.image4}
               carouselHiden={carouselHiden}
               setCarouselHiden={setCarouselHiden}
            />
         
            <ProductOption 
               id={prodInfo.id}
               brand={prodInfo.brand}
               description={prodInfo.description}
               name={prodInfo.name}
               price={prodInfo.price}
               characterist={prodInfo.characterist}
               image={prodInfo.image}
               amount={prodInfo.amount}
               category={prodInfo.category}
            />
            
         </div> 
         <ProductDescription 
            name={prodInfo.name}
            brand={prodInfo.brand}
            description={prodInfo.description}
            characterist={prodInfo.characterist}
         />
         <ProductQuestions/>
         <ComentsAndScores id={id}/>
      </>
      
   );
}

export default ProductInfo;