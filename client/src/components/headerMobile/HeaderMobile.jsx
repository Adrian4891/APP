import style from "./headerMobile.module.css";
import logoBk from "../../images/logoPage.svg";
import { Link } from "react-router-dom";
import { FiAlignCenter } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";

const HeaderMobile = ({setHiden, hiden, handleSearch}) => {
    const navigate = useNavigate();
    const productsCart = useSelector(state=> state.productsCart);

    return (
        <header className={style.headerMobile}>
            <div className={style.containMenu}>
                <img src={logoBk} alt="logo page" onClick={()=>navigate("/")}/>
                <div className={style.iconsMenuCart}>
                    <Link to="/cart"><AiOutlineShoppingCart className={style.iconCart}/> 
                      {productsCart.length > 0 && 
                        <span className={style.legthCart}>{productsCart.length}</span>}
                    </Link>
                    <FiAlignCenter className={style.iconMenu} onClick={()=>setHiden(!hiden)}/>
                </div>
            </div>

            <SearchBar handleSearch={handleSearch}/>

        </header>        
    );
}

export default HeaderMobile;