import style from "./cart.module.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createOrderPayment, editAmount, removeProduct } from "../../redux/actions";
import cartEmptyImg from "../../images/emptyCart.svg";
import Cookies from "js-cookie";
import Loader from "../loader/Loader";
import { paymentProgress, num } from "../../utils";

const Cart = ({load, handleLoader}) => {
    const productsCart = useSelector(state=> state.productsCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    const [ totalPrice, setTotalPrice ] = useState({
       subTotal:0,
       iva:0,
       total:0
    });
    
    const sumTotalPrice = (sumTotal=0) => {
       productsCart.forEach(product => {  
          sumTotal += product.price * product.amount; 
       });
       setTotalPrice({...totalPrice, 
            subTotal: sumTotal,
            iva: sumTotal * .21,
            total: sumTotal * 1.21
        });
    }

    const paymentCreate = async () =>{
        if (token) {
            const products = productsCart;
            dispatch(createOrderPayment(products));
            const { isDismissed } = await paymentProgress();
            isDismissed && navigate("/payment/in/progress");
        } 
    }

    const handleAmount = (event) => {
       const productFind = productsCart.find(product=> product.id === event.target.id);
       productFind.amount = event.target.value;
       dispatch(editAmount(userId, productFind)); 
    }

    const deleteProductCart = (productId) => {
        dispatch(removeProduct(userId, productId));
    }

    useEffect(()=>{
        handleLoader();
    },[]);

    useEffect(()=>{
       sumTotalPrice();
    },[productsCart]);

    if(load)
    return (
      <Loader/>
    );

    return (

        <Container className={style.container} >
            { productsCart.length > 0 &&  productsCart.map((product)=>{
                return (
                    <Row className="d-flex align-items-center" key={product.id} >
                        <Col className="d-flex align-items-center justify-content-center justify-content-between pb-1">
                            <div className={style.cardCart}>
                                <img 
                                src={product.image} 
                                alt={product.name} 
                                className={style.imgCart} 
                                onClick={()=>navigate(`/product/${product.ProductId}`)}/>
                                <div className={style.productInfo}>
                                    <p className="">{product.name}</p>
                                    <p className="">${num.format(product.price)}</p>
                                    <Link 
                                    className="text-decoration-none" 
                                    onClick={()=>deleteProductCart(product.ProductId)}
                                    >eliminar</Link>
                                </div>
                            </div>
                            <div className={style.quantity}>
                                <select 
                                id={product.id} 
                                onChange={handleAmount} 
                                className={style.selectQuant}
                                >
                                    <option value={product.amount}>{product.amount} u</option>
                                    {product.amount !== 1 && <option value={1}>1 u</option>}
                                    {product.amount !== 2 && <option value={2}>2 u</option>}
                                    {product.amount !== 3 && <option value={3}>3 u</option>}
                                    {product.amount !== 4 && <option value={4}>4 u</option>}
                                    {product.amount !== 5 && <option value={5}>5 u</option>}
                                    {product.amount !== 6 && <option value={6}>6 u</option>}
                                </select>

                            <p className="mb-0">${num.format(product.price)}</p>
                            </div>
                        </Col>
                    </Row>
                )})
            }
            { productsCart.length > 0 ?
                <Row className="d-flex align-items-center justify-content-end ">
                    <Col lg={6} md={7} className="d-flex justify-content-end align-items-center flex-column">
                        <div className={style.containTotalPrice}>
                            <div className={style.priceProperties}>
                                <p className="text-start">Sub total</p>
                                <p className="text-start">Iva</p>
                                <p className="text-start">Total</p>
                            </div>
                            <div className={style.subIvaTotal}>
                                <p className="text-end">${num.format(totalPrice.subTotal)}</p>
                                <p className="text-end">${num.format(totalPrice.iva)}</p>
                                <p className="text-end">${num.format(totalPrice.total)}</p>
                            </div>
                        </div>
                        <div className={style.containBtnPay}>
                            <button onClick={paymentCreate}>Preparar la compra</button>
                        </div>
                    </Col>
                </Row>
                : 
                <Row >
                    <Col className={style.notProducts}>
                        <h6>Agrega Productos!</h6> 
                        <img src={cartEmptyImg} alt="Imagen Cart"/>
                    </Col>
                </Row>
            }
            
        </Container>
       
    );
}

export default Cart;