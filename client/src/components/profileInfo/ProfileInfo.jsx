import style from "./profileInfo.module.css";
import { BsPersonCircle } from "react-icons/bs";
import {  FaLocationArrow, FaCalendarDay} from "react-icons/fa";
import { FaMap  } from "react-icons/fa";
import {  GiRotaryPhone } from "react-icons/gi";
import { AiFillEdit } from "react-icons/ai";
import { FiMail } from "react-icons/fi";

const ProfileInfo = ({userData,setEdit}) => {
   return(
      <div className={style.container}>
         <div className={style.titleProfile}>
               <h2>Tu perfil</h2>
         </div>
         <div  className={style.containerInfoProfile}>
            <div className={style.infoContacto}>
               <BsPersonCircle className={style.iconCard}/> 
               <div>
                  <h5>{userData.name} {userData.lastName}</h5>
                  <h6 className={style.info}> 
                     <FiMail className={style.iconData}/> {userData.email}</h6>
                  <h6 className={style.info}> 
                     <GiRotaryPhone className={style.iconData}/> {userData.telephone}
                  </h6>
               </div>
            </div>
            <div className={style.containDataLocation}>
               <div className={style.userDateProf}>
                  <h6 className={style.info}>
                     <FaMap className={style.iconData}/> {userData.state} {userData.city}
                  </h6>
                  <h6 className={style.info}>
                     <FaLocationArrow className={style.iconData}/>  {userData.address}
                  </h6>
                  <h6 className={style.info}>
                     <FaCalendarDay className={style.iconData}/> {userData.birthday?.split("-").reverse().join("-")}
                  </h6>  
                  <button 
                  onClick={()=>setEdit(true)} 
                  className={style.buttEdit}
                  ><AiFillEdit/>Edit info</button> 
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProfileInfo;