import { BsCreditCard2Back } from "react-icons/bs";
import { FaShippingFast,FaCcVisa,FaCcMastercard } from "react-icons/fa";
import {RiShieldStarLine } from "react-icons/ri";
import { SiAmericanexpress} from "react-icons/si";
import style from "./productOptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/actions";
import Cookies from "js-cookie";
import { createOrderPayment } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { nonAuthUser, paymentProgress, productInCart, num } from "../../utils";

const ProductOption = ({id,brand,description,name,price,characterist,image,amount,category }) => {

    const dispatch = useDispatch();
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    const productsCart = useSelector(state=> state.productsCart);
    const navigate = useNavigate(); 

    const addProductCart = async (id) => {
        if (token) {
            const productCart = {
               productId:id,
               name,
               price,
               brand, 
               image,
               amount,
               description,
               category
            }
            dispatch(addCart(userId,productCart));   
            const productFind = productsCart.find(product=> product.ProductId === id);
            if (!productFind) {
                const { isConfirmed } = await productInCart(name, image);  
                isConfirmed && navigate("/cart");
            }
        }
        else {
            const {isConfirmed} = await nonAuthUser();
            isConfirmed && navigate("/login");
            return;
        }
    }

    const paymentProduct = async () => {
        if (!token) {
            const {isConfirmed} = await nonAuthUser();
            isConfirmed && navigate("/login");
            return;
        }
        const products = [{id, name, image, description, amount, price, category}];
        dispatch(createOrderPayment(products));
        const { isDismissed } = await paymentProgress();
        isDismissed && navigate("/payment/in/progress");
    }
        
    return (
        <>
            <div className={style.containerBuy}>

                <h4>{name}: {brand} {description}</h4>
                <h4>Precio final: ${num.format(price)}</h4>
                <p className={style.icon}><RiShieldStarLine/> Garantía oficial</p>
                <p className={style.icon}><FaShippingFast/> Envío GRATIS desde $10.000</p>
                <p className={style.icon}><BsCreditCard2Back/>3, 6, y 12 Cuotas</p>
                <div>
                    <button onClick={()=>addProductCart(id)} className={style.addButt}>Agregar</button>
                    <button onClick={paymentProduct} className={style.buyButt}>Comprar</button>
                </div>

                <div className={style.containerCardBuy}>
                    <p className={style.titleCard}>Medios de Pago:</p>
                    <p className={style.iconCard}>
                        <FaCcVisa className={style.visaCard}/>
                        <FaCcMastercard className={style.masterCard}/> 
                        <SiAmericanexpress className={style.americanCard}/>
                    </p>
                    <ul>
                        <li>*Válido solo para Tarjetas Bancarias.</li>
                        <li>13% OFF en 6 Cuotas s/interés.</li>
                        <li>20% OFF en 3 Cuotas s/interés.</li>
                        <li>23% OFF en 1 Cuota.</li>
                        <li>*Seleccione sus cuotas en el checkout .</li>
                    </ul> 
                </div> 

            </div>
        </>
    );
}

export default ProductOption;