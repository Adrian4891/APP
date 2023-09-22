import style from "./notFound.module.css";
import imgNotFound from "../../images/notFoundImg.svg";

const NotFound = () => {
    return (
        <div className={style.container}>
                <img src={imgNotFound} alt="Not found imagen" />
        </div>
    );
}

export default NotFound;