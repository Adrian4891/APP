import React,{ useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import style from "./profileForm.module.css";
import { validateProfileInfo } from "../../validate";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({userData,setUserData,setEdit,edit }) => {
  const [ provincias, setProvincias ] = useState([]);
  const [ localidades, setLocalidades ] = useState([]);
  const [errors , setErrors ] = useState({});
  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  const getProvincias = async () => {
    try {
      const { data } = await axios(`/location/states`);
      setProvincias(data);
    } catch (error) {
      console.log(error);  
    }
  }

  const getCiudades = async (event) => {
    const name = event.target.value;
    handleChange(event);
    try {
      const { data } = await axios(`/location/cities/?name=${name}`);
      setLocalidades(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProvincias();
  },[]);

  const handleChange = (event) => {
    setUserData ({
      ...userData,
      [event.target.name]: event.target.value
    });
    setErrors(
      validateProfileInfo({...userData, 
      [event.target.name]: event.target.value
      })
    );
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.put(`/profile/${userId}`, userData);
      if (data.name) {
        setUserData(data);
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.profileForm}>
        <div className={style.contLabInputs}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input 
              type="text" 
              placeholder="name" 
              name="name" 
              value={userData.name} 
              onChange={handleChange}
            />
          </div>
          <div >
            <label htmlFor="lastName">Apellido: </label>
            <input 
              type="text" 
              placeholder="Last Name" 
              name="lastName" 
              value={userData.lastName} 
              onChange={handleChange}
              /> 
          </div>
        </div>
        {errors.name && <p>{errors.name}</p>}
        {errors.lastName && <p>{errors.lastName}</p>}
        <div className={style.contLabInputs}>
          <div className={style.contCityState}>
            <label htmlFor="state">Provincia: </label>
            <select name="state" id="" onChange={getCiudades}>
              <option value={userData.state}>{userData.state}</option>
              {
                provincias.map((prov)=>{
                  return (
                    <option value={prov.name} key={prov.id}>{prov.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className={style.contCityState}>
            <label htmlFor="city">Ciudad: </label>
            <select name="city" id="" onChange={getCiudades}>
              <option value={userData.city}>{userData.city}</option>
              {
                localidades.map((localidad)=>{
                  return(
                    <option value={localidad.name} key={localidad.id}>{localidad.name}</option>
                  )
                })
              }
            </select> 
          </div>
        </div>
        {errors.state && <p>{errors.state}</p>} 
        {errors.city && <p>{errors.city}</p>} 

        <div className={style.contLabInputs}>
          <div>
            <label htmlFor="address">Direccion: </label>
            <input
              type="text" 
              placeholder="address" 
              name="address" 
              value={userData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {errors.address && <p>{errors.address}</p>} 
        <div className={style.contLabInputs}>
          <div>
            <label htmlFor="telephone">Telefono: </label>
            <input 
              type="tel"
              placeholder="Ej: 011 1234-5678" 
              name="telephone"  
              value={userData.telephone} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="birthday">Fecha de nac: </label>
            <input 
              type="date" 
              placeholder="Nacimiento" 
              name="birthday" 
              value={userData.birthday}
              onChange={handleChange}
            /> 
          </div>
        </div>
        {errors.telephone && <p>{errors.telephone}</p>} 
        {errors.birthday && <p>{errors.birthday}</p>} 

        { edit ? 
          <div className={style.buttonsForm}>
            <button 
            className={style.buttonSub}
            disabled={Object.entries(errors).length > 0 ? true : false}
            >Submit</button>
            <button 
            disabled={Object.entries(errors).length > 0 ? true : false}
            className={style.buttonCancel}
            onClick={()=>navigate("/")}
            >Cancelar</button>
          </div>
          : 
          <div className={style.contButtComplete}>
            <button disabled={Object.entries(errors).length > 0 ? true : false}>Complete</button>
          </div>
        }
      </form>
    </div>
  );
}

export default ProfileForm;























