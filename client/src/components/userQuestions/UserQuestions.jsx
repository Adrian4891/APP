import style from "./userQuestions.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserRoll } from "../../redux/actions";
import Loader from "../loader/Loader";
import Swal from "sweetalert2";

const UserQuestions = ({load, handleLoader, products}) => {
    const userId = Cookies.get("userId");
    const { id } = useParams();
    const navigate = useNavigate();
    const [ userQuestion, setUserQuestion] = useState({});
    const [ message , setMessage ] = useState("");
    const [ questionSelect , setQuestionSelect ] = useState(false);
    const admData = useSelector(state=> state.admData);
    const dispatch = useDispatch();
    const product = products.find(item=> item.id === userQuestion.productId);

    const getQuestion = async () => {
        try {
            const { data } = await axios(`/questions/response/${id}`);
            console.log(data);
            if(data.question){
               setUserQuestion(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const notificationChecked = async () => {
        try {
            const { data } = await axios.put(`/notifications/${id}`);
        } catch (error) {
           console.log(error); 
        }
    }

    const questionPost = async (question) => {
        try {
           const { data } = await axios.post(`/questions`, question);
           if(data.id){
              setQuestionSelect(false)
              setMessage("");
              Swal.fire({
                    position:'top-end',
                    icon:'success',
                    title:'Tu pregunta se posteo con exito',
                    showConfirmButton:false,
                    timer:1500
               }).then((result)=>{
                if(result.isDismissed){
                    navigate("/"); 
                }
            });
           }
        } catch (error) {
            console.log(error);
        }
    }

    const responseUserQuestion = async (responseAdm) => {
        try {
           const { data } = await axios.put(`/questions` ,responseAdm);
           if(data[0].question){
               setMessage("");
               getQuestion();
               setQuestionSelect(false)
           }
        } catch (error) {
            console.log();
        }
    }

    const handleOnchange = (event) => {
        console.log(event.target.value);
        setMessage(event.target.value);
    }

    const submitQuestion = (event) => {
       event.preventDefault();
       if (admData.userRoll) {
           const responseAdm = {
            responseQuestion: message,
               userId: admData.id,
               productId: userQuestion.productId,
               questionId: id
           }
          return responseUserQuestion(responseAdm);
       }
       else if(userQuestion.answered && !admData.userRoll){
           const question = {
               userId,
               userQuestion: message,
               productId: product.id
            }
           return questionPost(question);
       }
    }

    useEffect(()=>{
        handleLoader();
        dispatch(getUserRoll(userId));
        getQuestion();
        console.log(admData.userRoll)
        if(!admData.userRoll) {
            notificationChecked();
        }
    },[]);

    if(load)
    return(
      <Loader/>
    )

    return(
       <div className={style.container}>
            <div className={style.containerFormAndMessages}>
                <div className={style.boxsMessages}>
                    <div className={style.userMessage}>   
                        <p>{userQuestion.question}</p>
                        { !userQuestion.answered  && admData.userRoll && !questionSelect  &&
                          <button onClick={()=>setQuestionSelect(true)}>responder</button>
                        }
                    </div>
                    { userQuestion.answered &&
                       <div className={style.admMessage}>
                            <p> <span>Vendedor</span>: {userQuestion.response}</p>
                       </div> 
                    }
                    {userQuestion.answered  && !questionSelect && !admData.userRoll &&
                     <button onClick={()=>setQuestionSelect(true)}>Hacer otra pregunta</button>
                    }
                </div>
                <form action="" onSubmit={submitQuestion}
                className={ questionSelect ? style.formQuestionRes : style.formNone }
                >
                    <label htmlFor="message">Deja tú mensaje: </label>
                    <textarea type="text" name="message" id="message" value={message} onChange={handleOnchange}/>
                    <button>Enviar</button>
                </form>
            </div>
       </div>
    );
}

export default UserQuestions;