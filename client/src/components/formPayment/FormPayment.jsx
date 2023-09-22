import style from "./formPayment.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { validateDataUser } from "../../validate";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderPayment } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const FormPayment = () => {
    const [ states, setStates] = useState([]);
    const [ cities, setCities ] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order = useSelector(state => state.order);
    const userId = Cookies.get("userId");
    
    const [ userData, setUserData ] = useState({
       name:"",lastName:"",codPostal:"",state:"", city:"",street:"",number:"",betweenStreet:"",dni:"",
       areaCode:"", numTel:""
    });

    const [ errors, setErrors ] = useState({
        name:"",lastName:"",codPostal:"",state:"", city:"",street:"",number:"",betweenStreet:"",dni:"",
        areaCode:"", numTel:""
    });
 
    const getStates = async () => {
        try {
            const { data } = await axios(`/location/states`);
            setStates(data);
        } catch (error) {
            console.log(error);  
        }
    }

    useEffect(()=>{
      getStates();
    },[]);
    
    const getCities=  async (event) => {
        const name = event.target.value;
        handleChange(event)
        try {
            const { data } = await axios(`/location/cities/?name=${name}`);
            setCities(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        console.log(event.target.name);
       console.log(event.target.value);

       setUserData({
          ...userData,
          [event.target.name]: event.target.value
       });

       setErrors(
          validateDataUser({
            ...userData,
            [event.target.name] : event.target.value
          })
        )
    }

    const submitOrder = async (event) => {
       event.preventDefault();
       const orderInfo = [];
       orderInfo.push(order);
       orderInfo.push(userData);
       try {
            const { data } = await axios.post(`/payments/${userId}`, orderInfo);
            window.location.href= data
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const cancelOrder = () => {
        dispatch(cancelOrderPayment());
        navigate("/");
    }


    return (
       <div className={style.container}>
                <form onSubmit={submitOrder}>
                    <div className={style.containData} >
                        <div className={style.contLabInp}>
                            <label htmlFor="name">Nombre</label>
                            <input 
                             id="name"
                             type="text" 
                             name="name"  
                             value={userData.name} 
                             onChange={handleChange}
                            />
                        </div>
                        <div className={style.contLabInp}>
                            <label htmlFor="lastName">Apellido</label>
                            <input 
                             type="text"
                             id="lastName"
                             name="lastName"  
                             value={userData.lastName} 
                             onChange={handleChange}
                            />
                        </div>
                    </div>
                    { errors.name && <p className={style.messageError}>{errors.name}</p>}
                    { errors.lastName && <p className={style.messageError}>{errors.lastName}</p>}

                    <div className={style.containData}>
                        <div className={style.contLabInp}>
                            <label htmlFor="dni">Dni</label>
                            <input 
                             type="number" 
                             name="dni"  
                             id="dni"
                             value={userData.dni} 
                             onChange={handleChange}
                            />
                        </div>
                        <div className={style.contLabInp}>
                            <label htmlFor="codPostal">Codigo Postal</label>
                            <input 
                             type="number"  
                             name="codPostal"  
                             id="codPostal"
                             value={userData.codPostal} 
                             onChange={handleChange} 
                            />
                        </div>
                    </div>
                    {errors.dni && <p className={style.messageError}>{errors.dni}</p>}
                    {errors.codPostal && <p className={style.messageError}>{errors.codPostal}</p>}
                        <div className={style.containData}>
                            <div className={style.contLabInp}>
                                <label htmlFor="state">Provincia</label>
                                <select name="state" id="state"  onChange={getCities}>
                                    <option value="" >Seleccione</option>
                                    { states.map((state)=>{
                                        return (
                                            <option value={state.name} key={state.id}> {state.name} </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className={style.contLabInp}>
                                <label htmlFor="city">Localidad</label>
                                <select name="city" id="city" onChange={handleChange}>
                                   <option value="" >seleccione</option>
                                   {cities.map((city)=>{
                                       return(
                                          <option value={city.name} key={city.id}>{city.name}</option>
                                       )
                                    })}
                                </select>
                            </div>
                        </div>
                        {errors.state && <p className={style.messageError}>{errors.state}</p>}
                        {errors.city && <p className={style.messageError}>{errors.city}</p>} 
                    
                        <div className={style.containData}>
                            <div className={style.contLabInp}>
                                <label htmlFor="street">Calle/Avenida</label>
                                <input 
                                 type="text"  
                                 name="street" 
                                 id="street"
                                 value={userData.street} 
                                 onChange={handleChange}
                                 className={style.street}
                                />
                            </div>
                            <div className={style.contLabInp}>
                                <label htmlFor="number">Número</label>
                                <input 
                                 type="number"  
                                 name="number" 
                                 id="number" 
                                 value={userData.number} 
                                 onChange={handleChange}
                                 className={style.number}
                                />
                            </div>
                        </div>
                        {errors.street && <p className={style.messageError}>{errors.street}</p>}
                        {errors.number && <p className={style.messageError}>{errors.number}</p>}
                    <div className={style.containData}>
                        <div className={style.contLabInp}>
                            <label htmlFor="areaCode">Cod Area</label>
                            <input 
                             type="text"  
                             name="areaCode" 
                             id="areaCode" 
                             value={userData.areaCode} 
                             onChange={handleChange}
                             className={style.codArea}
                            />
                        </div>
                        <div className={style.contLabInp}>
                            <label htmlFor="telephone">Número de telefono</label>
                            <input
                             type="number"  
                             name="numTel"
                             id="telephone"  
                             value={userData.numTel} 
                             onChange={handleChange}
                            />
                        </div>
                    </div>
                    {errors.areaCode && <p className={style.messageError}>{errors.areaCode}</p>}
                    {errors.numTel && <p className={style.messageError}>{errors.numTel}</p>}
                    <div className={style.containData}>
                        <div className={style.contLabInp}>
                            <label htmlFor="betweenStreet">¿Entre qué calles está? (Opcional)</label>
                            <input
                             type="text"  
                             name="betweenStreet"  
                             id="betweenStreet"
                             value={userData.entreCalles} 
                             onChange={handleChange}
                             className={style.entreCalles}
                            />
                        </div>
                    </div>
                    <div className={style.contButtons}>
                       <button>Continuar</button>
                       <button onClick={cancelOrder}>Cancelar</button>
                    </div>
               </form>
       </div>
    );
}

export default FormPayment;