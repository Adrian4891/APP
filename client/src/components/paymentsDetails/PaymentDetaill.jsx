import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./paymentDetails.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import Loader from "../loader/Loader";
import { num } from "../../utils";

const PaymentDetaill = ({load, handleLoader}) => {

  const [ detaill, setDetaill ] = useState([]);
  const [ dataPay, setDataPay ] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();

  const paymentDetaill = async () => {
    try {
      const { data } = await axios.post(`/payments/detail/${id}`);
      if(!data) throw Error("No hay pagos");
      const result = data.find(item => item.metodo );
      setDataPay(result);
      data.pop()
      setDetaill(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deletePayCancelled = async () => {
    const id = location.pathname.slice(17);
    try {
      const { data } = await axios.delete(`/payments/delete/${id}`);
      if(data) navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    paymentDetaill();
    handleLoader();
  },[]);

  if(load)
  return (
    <Loader/>
  );

  return (
    <div className={style.container}>
      <div className={style.containerDetails}>

        <div className={style.cotainStatus}>
          { dataPay.status === "pending" && 
            <h6><RiErrorWarningFill className={style.iconPending}/> Pago pendiente</h6>
          }
          { dataPay.status === "approved" &&
            <h6><BsFillCheckCircleFill className={style.iconApproved}/> Pago aprobado</h6>
          }
          { dataPay.status === "cancelled" && 
            <h6><RiErrorWarningFill className={style.iconCancelled}/> Su pago expiro, o fue rechazado</h6>
          }
        </div> 

        {  detaill.map((det)=>{
          return(
            <article key={det.id} className={style.cardDetails}>
              <img src={det.picture_url} alt={det.title} />
              <div className={style.detailProduct}>
                <p>Producto: {det.title}</p>
                <p>Precio: ${num.format(det.unit_price)}</p>
                <p>Cantidad: {det.quantity}</p>
                <p>Caracteristicas: {det.description}</p>
              </div>
            </article>
          )})
        }
        
        <div className={style.transactionProduct}>
          <div className={style.detailsPay}>
            <p>
              {dataPay.type === 'account_money'  && `Metodo de pago : Dinero en la cuenta`}
              {dataPay.type === 'credit_card'  && `Metodo de pago : Tarjeta de credito`}
              {dataPay.type === 'ticket'  && `Metodo de pago : ${dataPay.metodo}`}
            </p> 
            <div>
              <p>Compraste: {detaill.length} productos</p>
              <p>Total: ${num.format(dataPay.totalPaidAmount)}</p>
              { dataPay.status === "pending" &&
                <div>
                  <p>Paga en todas la sucursales de {dataPay.metodo}</p>
                  <a href={`${dataPay.urlPaymentPending}`}>Ver Ticket de pago</a>
                </div>
              }
              { dataPay.status === "cancelled" &&
                <div>
                  <p>Volve a comprar el producto </p>
                  <button onClick={deletePayCancelled}>Volver</button>
                </div>
              } 
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PaymentDetaill;