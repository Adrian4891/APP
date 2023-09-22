import style from "./scoresProduct.module.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import SuccessCalification from '../successCalification/SuccessCalification';
import { BsStarFill } from 'react-icons/bs';

const ScoresProduct = () => {

    const [ score , setScore ] = useState(0);
    const [ coment , setComent ] = useState("");
    const [ product , setProduct ] = useState({});
    const [ error , setError ] = useState("");
    const [ success , setSuccess ] = useState(false);
    const userId = Cookies.get("userId");
    const { id } = useParams();
    const navigate = useNavigate();

    const getProduct = async() => {
        try {
            const { data } = await axios(`/products/${id}`);
            if(data.name){
                setProduct(data); 
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const rateProduct = async (scoreProduct) => {
        try {
            const { data } = await axios.post(`/scores/${id}`, scoreProduct);
            if (!data.score) throw Error("La calificación no se realizo");
            return data;

        } catch (error) {
            return error.response.data;
        }
    }

    const handleStars = (starsValue) => {
        if (score === starsValue-1)  return setScore(starsValue);
        if(score >= starsValue)  return setScore(starsValue-1);
    }

    const handleComent = (event) => {
       setComent(event.target.value);
    }

    const submitScores = async  (event) => {
       event.preventDefault();
       const scoreProduct = {
          userId,
          coment,
          score,
       }
       const data = await rateProduct(scoreProduct);
       if (data.score) { 
          setSuccess(true);
          setTimeout(() => {
              setSuccess(false);
              navigate("/shoping");
          },1500);
        }
       else {
          setError(data);
       }
    }

    useEffect(()=>{
      getProduct();
    },[]);

    if(success)
    return (
      <SuccessCalification/>
    )

    return (
        <div className={style.container}>
            <section className={style.containerScores}>
                {error !== "" && <p className={style.errorScore}>{error}</p>}
                <h3>¿Cuántas estrellas le das al producto?</h3>
                <img src={product.image} alt={product.name}/>
                <h6>{product.name} {product.brand}</h6>
                <div className={style.containStars}>
                    <BsStarFill 
                    onClick={()=>handleStars(1)}
                    className={score >= 1 ? style.starlight : style.starDark}
                    />
                
                    <BsStarFill 
                    onClick={()=>handleStars(2)}
                    className={score >= 2 ? style.starlight : style.starDark}
                    />
                    
                    <BsStarFill 
                    onClick={()=>handleStars(3)}
                    className={score >= 3 ? style.starlight : style.starDark}
                    />
                    <BsStarFill 
                    onClick={()=>handleStars(4)}
                    className={score >= 4 ? style.starlight : style.starDark}
                    />
                
                    <BsStarFill 
                    onClick={()=>handleStars(5)}
                    className={score === 5 ? style.starlight : style.starDark}
                    />
                </div>
                <div className={style.scoreRef}>
                    <p>Malo</p>
                    <p>Exelente</p>
                </div>
                <form action="" className={style.rateForm} onSubmit={submitScores}>
                    <label htmlFor="">Dejá tu opinión (Es opcional)</label>
                    <textarea name="coment" value={coment} onChange={handleComent}></textarea>
                    <button>Calificar</button>
                </form>
            </section>
        </div>
    )
}

export default ScoresProduct;