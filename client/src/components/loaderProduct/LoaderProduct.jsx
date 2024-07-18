import style from "./loaderProduct.module.css";
import Spinner from "react-bootstrap/esm/Spinner";

const LoaderProduct = () => {
    return(
       <div className={style.container}>
          <Spinner animation="border" role="status" variant="danger" className={style.spinner}/>
          <h4>Cargando...</h4>
       </div>
    )
}

export default LoaderProduct;