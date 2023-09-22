import style from "./footer.module.css";
import { BsLinkedin, BsTelegram , BsWhatsapp} from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import logoBk from "../../images/logoPage.svg";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        
        <div className={style.container}>
            <img src={logoBk} alt="logo-img" />
            <div className={style.contIcon}>
               <Link to="javascrip:void(0"
               onClick={()=>window.location = "mailto:ernestobarraza216@gmail.com"}
               > 
                 <BsLinkedin/>
               </Link>
               <Link><BsTelegram/></Link>
               <Link to="https://github.com/Adrian4891"><AiFillGithub/></Link>
               <Link><BsWhatsapp/></Link>
            </div>
        </div>
    );
}

export default Footer;