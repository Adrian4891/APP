import { arrSlider } from "../../utils";
import style from "./baner.module.css";

const Baner = () => {
   return (
      <div className={style.container}>
            <h1>Las mejores marcas</h1>
         <div className={style.contSlides}>
            { arrSlider.map((slide, index)=>{
               return (
                  <div className={style.slide} key={index}>
                     <img src={slide} alt="" />
                  </div>
               )   
            })}
         </div>
      </div>
   );
}

export default Baner;