import storeImg from "../../images/storeImg.png";
import paymentImg from "../../images/mediosPng.png";
import packageImg from "../../images/packageImg.png";
import style from "./shopInfo.module.css";

const PaymentsOptions = () => {
  return (
    <div className={style.container} >
      <div className={style.containOptions}>
        <div className={style.options}>
          <img src={storeImg} alt="storePng" />
          <h5>Eligí los producto que compraras</h5>
          <p>Si es mas de uno, agregalos al carrito</p>
        </div>
        <div className={style.optionsMet}>
          <img src={paymentImg} alt="storePng" />
          <h5>Paga con el medio que prefieras</h5>
          <p>Usamos tegnologia de mercado pago</p>
        </div>
        <div className={style.options}>
            <img src={packageImg} alt="storePng" />
            <h5>Recibí el producto que esperás</h5>
            <p>Elegí la forma de envio que quieras</p>
        </div>
      </div>        
    </div>
  );
}

export default PaymentsOptions;