import style from "./paymentsMethods.module.css";
import imgMercado from "../../images/mercadoImg.svg";
import imgCards from "../../images/tarjetasImg.jpg";
import rapiImg from "../../images/pagoRapiImg.jpg";

const PaymentsMethods = () => {
    return (
        <div className={style.container}>
                <h5>Nuestros medios de pagos</h5>
            <section >
                <article className={style.containerImg}>
                    <p>Pagá Con dinero en tu cuenta</p>
                    <img src={imgMercado} alt="Imagen mercadoPago" />
                </article>
                <article className={style.containerImg}>
                    <p>Pagá en 6, 12 o 18 cuotas</p>
                    <img src={imgCards} alt="Imagen tarjetas de credito" />
                </article>
                <article className={style.containerImg}>
                    <p>Compra y Pagá después</p>
                    <img src={rapiImg} alt="Imagen Rapi Pago Facil" />
                </article>
            </section>
        </div>
    );
}

export default PaymentsMethods;