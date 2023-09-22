import style from "./carouselProduct.module.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const CarouselProduct = ({
    prodInfo, 
    carouselHiden, 
    setCarouselHiden, 
    count, 
    setCount, 
    handleCount
    }) => {
    return (
       <>
          { carouselHiden && 
               <div 
                  className={style.containerOverlayImg} 
                  onClick={()=>setCarouselHiden(!carouselHiden,setCount(1))}
               ></div >
           }
          
           { carouselHiden &&  
               <div className={style.containerCarousel}>
                 <div>
                    <p onClick={()=>setCarouselHiden(!carouselHiden,setCount(1)) }>X</p>
                  </div>
                 <article className={style.carouselImgs}>
                    <RiArrowLeftSLine onClick={(()=>handleCount("decrement"))} className={style.arrowIcon}/>
                    <img src={count === 1 ? prodInfo.image : prodInfo[`image${count}`]} alt={prodInfo.name}/>  
                    <RiArrowRightSLine onClick={(()=>handleCount("increment"))} className={style.arrowIcon}/>
                 </article>
               </div> 
            }
       </>
    );
}

export default CarouselProduct;