import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import style from "./shoping.module.css";
import Loader from "../loader/Loader";
import { num } from "../../utils";

const Shoping = ({load, handleLoader}) => {
    const [shoping, setShoping] = useState([]);
    const navigate = useNavigate();
    const userId = Cookies.get("userId");

    const getShoping = async () => {
       try {
          const { data } = await axios(`/payments/${userId}`);
          if(!data) throw Error("No hay pagos");
          setShoping(data);
       } catch (error) {
          console.log(error.message);
       }
    }

    useEffect(()=>{
      getShoping();
      handleLoader();
    },[]);

    if(load)
    return (
      <Loader/>
    );

    return (
        <div className={  style.container}>
            <section className={ style.containerShop}> 
                { shoping.length > 0 ? shoping.map((shop)=>{
                    return(
                        <div key={shop.id} className={style.cardsShop}>
                            <article>
                                <p>{shop.name}</p>
                                <p>{shop.description}</p>
                                <img 
                                 src={shop.image} 
                                 alt={shop.name} 
                                 className={style.imgShop} 
                                 onClick={()=>navigate(`/product/${shop.productId}`)}
                                />
                                <p>Cantidad: {shop.quantity}</p>
                                <p>Precio unitario: <b>${num.format(shop.price)}</b> </p>
                            </article>
                            <div className={style.containerBtn}>
                                <button 
                                 onClick={()=>navigate(`/payment/details/${shop.paymentId}`)}
                                >Ver detalle</button>
                                { !shop.score && 
                                  <button 
                                     onClick={()=>navigate(`/scores/product/${shop.productId}`)}
                                  >Calificalo</button> 
                                }
                            </div>
                        </div>
                    )})
                    :
                    <div className={ style.emptyShoping}>
                       <h3> Que esperas para hacer tu compra? </h3>
                    </div>
                }   
            </section>
        </div>
        
    );
}

export default Shoping;