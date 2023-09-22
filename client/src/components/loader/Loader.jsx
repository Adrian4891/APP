import style from "./loader.module.css";
import logoPage from "../../images/logoPage.svg";
import Spinner from 'react-bootstrap/Spinner';
import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className={style.container}>
            <div className={style.loader}>
                <motion.img  layout src={logoPage} alt="Image logo"
                 animate={{ 
                    scaleX:[2,2.2,2.3,2.2,2],
                    scaleY:[2,2.2,2.3,2.2,2],
                    rotateY:[0,120,0]
                 }}
                 transition={{
                    duration:1.5,
                    ease:"linear",
                    times:2,
                    repeat:1,
                    repeatDelay:1
                 }} />
                <Spinner animation="border" role="status" variant="danger" className={style.spinner}/>
           </div>
        </div>
    );
}

export default Loader;