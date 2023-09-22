import style from "./cards.module.css";
import { useDispatch, useSelector} from "react-redux";
import {addCart, addFavs, removeFav} from "../../redux/actions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {FaHeart, FaRegHeart,FaCartPlus} from 'react-icons/fa';
import { nonAuthUser, productInCart, num } from "../../utils";
import LikeAnimation from "./LikeAnimation";

const Cards = ({id,image,name,price,brand,amount,description,category}) => {
  const [like , setLike] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [ fav, setFav ] = useState(false);
  const productsFavs = useSelector(state=> state.productsFav);
  const productsCart = useSelector(state=> state.productsCart);
  
  const addProductCart = async (productId) => {
    if (token) {
      const productCart = {
        productId:productId,
        name, 
        price, 
        brand, 
        image,
        amount,
        description,
        category
      }
      dispatch(addCart(userId, productCart));
      const productFind = productsCart.find((product)=>product.ProductId === productId);
      if(!productFind){
        const { isConfirmed } = await productInCart(name, image);
        isConfirmed && navigate("/cart");
      } 
    }
    else {
      const { isConfirmed } = await nonAuthUser();
      isConfirmed && navigate("/login");
    }
  }
  
  const handleFavs = (productId) => {
    if(fav){
      dispatch(removeFav(userId, productId));
      setFav(false);
    }
    else {
      const favorite = {
        id:userId,
        product:[productId]
      }
      dispatch(addFavs(favorite));
    }
  }

  const handleAnimationLike = () =>{
    setLike(true);
    setTimeout(() => {
      setLike(false);
    },1000);
  }
  
  useEffect(()=>{
    productsFavs.forEach((product)=>{
      if(product.id === id){
        setFav(true);
      }
    })
  },[productsFavs]);

  return (
    <div className={style.card} key={id}>
      {like && <LikeAnimation like={like}/>}
      <img src={image} alt={name} onClick={()=>navigate(`/product/${id}`)}/>
      <div className={style.cardInfo} >
        <h5>${num.format(price)}</h5>
        <h6>{name} {brand}</h6>
        <p>{description}</p>
      </div>
      <FaCartPlus onClick={()=>addProductCart(id)} className={style.buttAdd}/>
      <button onClick={()=>handleFavs(id)} className={style.buttFav}> 
        { !fav && !like ? 
         <FaRegHeart
         className={style.buttNotFav} 
         onClick={()=>handleAnimationLike()}
         />
         :
         <FaHeart className={style.buttIsFav}/>
        } 
      </button>
    </div>
  );
}

export default Cards;