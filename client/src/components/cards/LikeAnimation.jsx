import style from "./cards.module.css";
import { motion } from "framer-motion";
import heartGroup from "../../images/heartGroupLike.svg";
import heartLike from "../../images/heartLike.svg";
import heartLike2 from "../../images/heartLike2.svg";
import heartLike3 from "../../images/heartLike3.svg";
import heartLike4 from "../../images/heartLike4.svg";

const LikeAnimation = ({like}) => {
    const variants = {
        likeAnimation:{
            scaleX:1,
            opacity:[0,0.9,0],
            translateY:[100,10]
        },
        likeTransition:{
            duration:1.6,
            ease:"linear",
        }
    }
   
    return(
        <>
            <motion.img src={heartGroup}
            className={style.heartsGroup}
            animate={like && "likeAnimation"} 
            transition={like && variants.likeTransition}
            variants={variants}
            />
            <motion.img src={heartLike}
            className={style.heart}
            animate={like && "likeAnimation"} 
            transition={like && variants.likeTransition}
            variants={variants}
            />
            <motion.img src={heartLike2}
            className={style.heart2}
            animate={like && "likeAnimation"}
            transition={like && variants.likeTransition }
            variants={variants}
            />
            <motion.img src={heartLike3}
            className={style.heart3}
            animate={like && "likeAnimation"} 
            transition={like && variants.likeTransition}
            variants={variants}
            />
            <motion.img src={heartLike4}
            className={style.heart4}
            animate={like && "likeAnimation"} 
            transition={like && variants.likeTransition}
            variants={variants} 
            />
        </> 
    )
}

export default LikeAnimation;