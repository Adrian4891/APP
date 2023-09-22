import style from "./menuMobile.module.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetFavs, resetCart } from "../../redux/actions";
import { GiGuitarBassHead, GiPianoKeys, GiDrum, GiMusicalNotes } from "react-icons/gi";  
import { BsFillPersonDashFill, BsFillPersonPlusFill, BsFillPersonLinesFill } from "react-icons/bs"; 
import { FaHeart , FaShopify } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";
import { GiGuitarHead } from "react-icons/gi";
import { IoNotificationsSharp } from "react-icons/io5";
import { useEffect } from "react";
import {  } from "react-icons/fa";
const MenuMobile = ({
  hiden, 
  setHiden, 
  filterCategory, 
  countNotification,
  setCountNotification,
  getNotifications,
  handleLoader

  }) => {

  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const logOut = () => {
    Cookies.set("userName", "", 0);
    Cookies.set("userId", "", 0);
    Cookies.set("token", "", 0);
    Cookies.set("userEmail","", 0);
    dispatch(resetFavs());
    dispatch(resetCart());
    setHiden(true);
    setCountNotification("");
    handleLoader();
  }

  useEffect(()=>{
    getNotifications();
  },[]);

  return(
    <>
      <div className={ hiden == true ? style.containerHiden : style.containerVis}>
        <div className={style.containerMenu}>
          <button onClick={()=>setHiden(!hiden)} className={style.btnMenuClose}>X</button>
          <nav>
            <ul className={style.menuRoutes} onClick={()=>setHiden(!hiden)}>
              <li>
                <AiFillHome  className={style.iconMobile}/> 
                <Link to="/" > Inicio</Link>
              </li>
              <li>
                <FaHeart className={style.iconMobile}/>
                <Link to="/favorites" > Favoritos</Link>
              </li>
              <li>
                <FaShopify className={style.iconMobile}/>
                <Link to="/shoping">Compras</Link>
              </li>
              <li>
                <IoNotificationsSharp className={style.iconMobile}/>
                <Link to="/notifications" >
                  Notificaciones
                  {countNotification > 0 && <span>{countNotification}</span>}
                </Link>
              </li>
            </ul>
              <p className={style.categoryTitle}>Categorias</p>
            <ul className={style.menuRoutes}>
              <li>
                <GiGuitarHead className={style.iconMobile}/>
                <Link to="/category" onClick={()=>filterCategory("Guitarras")}>Guitarras</Link>
              </li>
              <li>
                <GiGuitarBassHead className={style.iconMobile}/>
                <Link to="/category" onClick={()=>filterCategory("Bajos")}>Bajos</Link>
              </li>
              <li>
                <GiDrum className={style.iconMobile}/>
                <Link to="/category" onClick={()=>filterCategory("Baterias")}>Baterias</Link>
              </li>
              <li>
                <GiPianoKeys className={style.iconMobile}/>
                <Link to="/category" onClick={()=>filterCategory("Pianos")}>Pianos</Link>
              </li>
              <li>
                <GiMusicalNotes className={style.iconMobile}/>
                <Link to="/category" onClick={()=>filterCategory("Accesorios")}>Accesorios</Link>
              </li>
                
            </ul>
            <ul className={style.menuRoutes} onClick={()=>setHiden(!hiden)}>
              {  !token ?
                <li>
                  <BsFillPersonPlusFill className={style.iconMobile}/>
                  <Link to="/login">Ingresar</Link>
                </li> 
                :
                <>
                  <li >
                      <BsFillPersonLinesFill className={style.iconMobile}/>
                      <Link to="/profile">Perfil</Link>
                  </li>
                  <li >
                      <BsFillPersonDashFill className={style.iconMobile}/>
                      <Link to="/" onClick={logOut}>Salir</Link>
                  </li>
                </>
              }  
            </ul>
          </nav>
        </div>
      </div>        
      <div className={hiden ? style.overlayHiden : style.overlayVis} onClick={()=>setHiden(!hiden)}>
      </div>
    </>

  );
}

export default MenuMobile;
