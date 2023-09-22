import style from "./notifications.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserRoll } from "../../redux/actions";
import Loader from "../loader/Loader";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Notifications = ({load, handleLoader}) => {
    
    const userId = Cookies.get("userId");
    const [ notifications, setNotifications ] = useState([]);
    const dispatch = useDispatch();
    const admData = useSelector(state=> state.admData);
    const navigate = useNavigate();

    const getNotifications = async () => {
        try {
            const { data } = await axios(`/notifications/${userId}`);
            if(data[0].id){
                setNotifications(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        handleLoader()
       dispatch(getUserRoll(userId));
       getNotifications();
    },[]);

    if(load)
    return(
      <Loader/>
    );

    return(
      <div className={style.container}>
          { notifications.length > 0 ? notifications.map((notification)=>{
            return(
                <div key={notification.id} className={style.containerNotification}>
                    {!admData.userRoll ? 
                        <div 
                        className={!notification.userChecked ? style.notification
                        : style.notificationChecked }
                        >
                            <img 
                            src={notification.productImg} 
                            alt={notification.productName} 
                            className={style.notificationImg} 
                            onClick={()=>navigate(`/product/${notification.productId}`)}
                            />
                            <div className={style.notificationText} >
                                <p>
                                {`Te contestaron por ${notification.productName} ${notification.productBrand}`}
                                </p>
                                <Link 
                                to={`/user/questions/${notification.questionId}`} 
                                >
                                Ver respuesta
                                </Link>
                                {notification.userChecked &&
                                 <AiOutlineCheck className={style.notificationCheck}/>
                                }
                            </div>
                        </div>
                            :
                        <div 
                        className={ notification.verified ? style.notificationChecked 
                        :style.notification }
                        >
                            <img 
                            src={notification.productImg} 
                            alt={notification.productName} 
                            className={style.notificationImg}
                            onClick={()=>navigate(`/product/${notification.productId}`)}
                            />
                            <div className={style.notificationText}>
                                <p>
                                {`Te preguntaron por ${notification.productName} ${notification.productBrand}`}
                                </p>
                                <Link 
                                to={`/user/questions/${notification.questionId}`} 
                                >
                                Ver Pregunta 
                                </Link>
                                { notification.verified &&
                                  <AiOutlineCheck className={style.notificationCheck}/>
                                }
                            </div> 
                        </div>
                    }
                </div>
           )})
            : 
            <div className={style.emptyNotifications}>
                <h3>No tiene noficaciónes</h3>
            </div>
        }
      </div>
   )
}

export default Notifications;