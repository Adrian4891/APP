import style from "./signUp.module.css"
import { Link } from "react-router-dom"
import React, { useState } from "react";
import  {validateSignUp}  from "../../validate";
import { useNavigate } from "react-router-dom";
import {FiMail} from "react-icons/fi";
import { BsPersonCircle, BsEyeSlashFill, BsPersonLock, BsEyeSlash } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import Swal from "sweetalert2";
import logoPage from "../../images/logoPage.svg";


const  SignUp = ({signUp}) => {

    const [ hiden, setHiden ] = useState(false)
    const navigate = useNavigate();
    const [ message, setMessage] = useState("");
    const [userData, setUserData] = useState({
        userName:"",
        email:"",
        password:""
    });

    const [errors, setErrors] = useState({
       userName:"",
       email:"",
       password:""
    });

    const handleFormEvent  = (event) => {
        console.log(event.target.value);
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        setErrors(
            validateSignUp({
               ...userData,
               [event.target.name]: event.target.value
            })
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await signUp(userData);
        if(response.id){
            Swal.fire({
                position:'top-end',
                icon:'success',
                title:'Tu cuenta se creo con exito',
                showConfirmButton:false,
                timer:1500
            }).then((result)=>{
                if(result.isDismissed){
                    navigate("/login"); 
                }
            });
        } 
        else {
            setMessage(response.data);
        }
    }

    return (
        <div className={style.containerSignUp}>
            <div className={style.containerForm}>
                { message && <p>{message}</p>}
                <div>
                    <h1>Sign up</h1>
                    <img 
                    src={logoPage} 
                    alt="logo" 
                    className={style.imgLogo}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={style.contInputs}>
                        <BsPersonCircle className={style.iconsSingUp}/>
                        <input 
                        type="text" 
                        name="userName" 
                        placeholder="User Name"
                        value={userData.userName}
                        onChange={handleFormEvent}
                        className={errors.userName ? style.inputError : style.inputOk}
                        />
                    </div>
                    {errors.userName && <p>{errors.userName}</p>}
                    <div className={style.contInputs}>
                        <FiMail className={style.iconsSingUp}/>
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="ejemplo@gmail.com" 
                        value={userData.email}
                        onChange={handleFormEvent}
                        className={errors.email ? style.inputError : style.inputOk}
                        />
                    </div> 
                    {errors.email && <p>{errors.email}</p>}
                    <div className={style.contInputs}>
                        <BsPersonLock className={style.iconsSingUp}/>
                        <input 
                            type={!hiden ? `password` : `text`} 
                            name="password" 
                            placeholder="password" 
                            value={userData.password}
                            onChange={handleFormEvent}
                            className={errors.password ? style.inputError : style.inputOk}
                        />
                        {!hiden ? <BsEyeSlash onClick={()=>setHiden(true)} className={style.iconsSingUp}/> 
                            :<IoEyeSharp onClick={()=>setHiden(false)} className={style.iconsSingUp}/>
                        }
                    </div>
                    {errors.password && <p>{errors.password}</p>}
                    <div className={style.contButton}>
                        <button disabled={Object.entries(errors).length ? true : false}>Sign Up</button>
                        <p>Ya tienes cuenta? <Link to="/login">Sign In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;