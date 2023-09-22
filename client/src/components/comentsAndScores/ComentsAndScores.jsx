import style from "./comentsAndScores.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

const ComentsAndScores = ({id}) => {
    const [ scores, setScores ] = useState([]);
    const [ promed , setPromed ] = useState(0);
    
    const getScores = async () => {
        try {
           const { data } = await axios(`/scores/${id}`);
           if(!data[0].id) throw Error("No hay datos para mostrar");
           setScores(data);
           let sum = 0;
            if (data.length > 1) {
                data.forEach((item)=>{
                sum += item.score
                });
               return setPromed(sum /data.length);
            }
            setPromed(data[0].score);
        } catch(error){
            console.log(error);
        }
    }
    
    useEffect(()=>{
       getScores();
    },[]);

    return(
        <div className={style.container}>
            { scores.length > 0 ? 
                <section className={style.containerStarts}>
                    <h6>Calificación {promed.toFixed(1)} estrellas </h6>
                    <article>
                        <BsStarFill className={promed  >= 1 ? style.ligthStar : style.starOff}/>
                        { promed > 1  && promed < 2 ? 
                        <BsStarHalf className={style.ligthStar}/>
                        :
                        <BsStarFill className={promed  >= 2 ? style.ligthStar : style.starOff}/>
                        }
                        { promed > 2  && promed < 3 ? 
                        <BsStarHalf className={style.ligthStar}/>
                        :
                        <BsStarFill className={promed  >= 3 ? style.ligthStar : style.starOff}/>
                        }
                        {promed > 3 && promed < 4 ?
                         <BsStarHalf className={style.ligthStar}/>
                        :
                        <BsStarFill className={promed  >= 4 ? style.ligthStar : style.starOff}/>
                        }
                        { promed > 4 && promed < 5 ?
                        <BsStarHalf className={style.ligthStar}/>
                        :
                        <BsStarFill className= {promed === 5  ? style.ligthStar : style.starOff}/>
                        }
                    </article>
                    <p>{`(Cantidad de Votos: ${scores.length} )`}</p>
                </section>
                :
               <section className={style.emptyQuestions}>
                  <h6>Este producto no tiene calificaciones</h6>
                  <article>
                    <BsStarFill className={style.starOff}/>
                    <BsStarFill className={style.starOff}/>
                    <BsStarFill className={style.starOff}/>
                    <BsStarFill className={style.starOff}/>
                    <BsStarFill className={style.starOff}/>
                  </article>
               </section> 
            } 
            { scores.length > 0 &&
                <section className={style.containerComents}>
                    <h6>Comentarios:</h6>
                
                    { scores.map((score)=>{
                      return (   score.coment !== "" && 
                            <div key={score.id} className={style.coments}>
                               <div className={style.starsComents}>
                                    {score.score >= 1 && <BsStarFill className={style.ligthStar}/>}
                                    {score.score >= 2 && <BsStarFill  className={style.ligthStar}/>}
                                    {score.score >= 3 && <BsStarFill  className={style.ligthStar}/>}
                                    {score.score >= 4 && <BsStarFill className={style.ligthStar}/>}
                                    {score.score === 5 && <BsStarFill  className={style.ligthStar}/>}
                                </div> 
                                <p>{score.coment}</p>
                            </div> 
                        )
                    })}   
                </section>
            }  
        </div>
    );
}

export default ComentsAndScores;
