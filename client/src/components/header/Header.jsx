import style from "./header.module.css";
import { Link } from "react-router-dom";
import logo from "../../images/logoPage.svg";
import BreadCrumbCategories from "../breadCrumbCategories/BreadCrumbCategories";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, resetCart, getFavs, resetFavs, resetSesionAdm } from "../../redux/actions";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaRegUserCircle, FaShoppingCart} from "react-icons/fa";
import {IoNotificationsSharp } from "react-icons/io5";
import SearchBar from "../searchBar/SearchBar";
import Swal from "sweetalert2";

const Header = ({
    filterCategory,
    handleSearch, 
    countNotification,
    setCountNotification,
    getNotifications,
    handleLoader,
    }) => {
        
    const productsCart = useSelector(state=> state.productsCart);
    const dispatch = useDispatch();
    const userName = Cookies.get("userName") ;
    const id = Cookies.get("userId") ;
    const token = Cookies.get("token");

    const logOut = () => {
        Cookies.set("userName", "", 0);
        Cookies.set("userId", "", 0);
        Cookies.set("token", "", 0);
        Cookies.set("userEmail","", 0);
        dispatch(resetCart());
        dispatch(resetFavs());
        dispatch(resetSesionAdm());
        setCountNotification(0)
        handleLoader();
    }
    const nonUserAuth = () => {
        if(!token){
          Swal.fire({
            icon:'error',
            title:"No estas logueado!",
            showCloseButton:true,
            confirmButtonText:'Loguearme',
            showConfirmButton:true,
            focusClose:true,
          }).then((result)=>{
            if (result.isConfirmed) {
              navigate("/login")
            }
          });
        }
    }
    useEffect(()=>{
        if (token) {
            dispatch(getCart(id));
            dispatch(getFavs(id));
            getNotifications();        
        }
    },[]);

    return(
        <header className={style.headerDesktop}>
            <img src={logo} alt="logo Imagen"  className={style.logoImg}/>
            <div>
                <SearchBar handleSearch={handleSearch}/>
                <BreadCrumbCategories filterCategory={filterCategory}/>
            </div>
            
            <nav className={style.NavDesktop}>
                <Link className={style.routesPage} to="/">Inicio</Link>
                <Link 
                className={style.routesPage} 
                to={token ? `/shoping` : "/"}
                onClick={nonUserAuth}
                >Compras</Link>
                <Link 
                className={style.routesPage} 
                to={token ? `/favorites` : "/"}
                onClick={nonUserAuth}
                >Favoritos</Link>
                <Link 
                to={token ? `/cart` : "/"}
                onClick={nonUserAuth}
                >
                    <FaShoppingCart className={style.iconHeaderCart}/>
                    {productsCart.length !== 0 &&
                        <span className={style.numProd}> {`${productsCart.length}`}</span>
                    }
                </Link>    
                <Link 
                to={token ? `/notifications` : "/" } 
                className={style.notificationIcon}
                onClick={nonUserAuth}
                >
                    <IoNotificationsSharp/>
                    {countNotification > 0 && <span>{countNotification}</span>}
                </Link>
            </nav>
            {  !token ?
                <div className={style.logLikn}> 
                    <FaRegUserCircle/> <Link to="/login" > LogIn</Link> 
                </div>
                : 
                <Dropdown className="p-0">
                    <Dropdown.Toggle variant="" id="dropdown-basic" className={style.droptogle} >
                        <span>{userName}</span>
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu className={style.dropMenuHeader}>
                        <Link to="/profile" className={style.dropLink}>Perfil</Link>
                        <Link to="/" onClick={logOut} className={style.dropLink}>Salir</Link>
                    </Dropdown.Menu>
                </Dropdown>
            }     
        </header> 
    );
}

export default Header;