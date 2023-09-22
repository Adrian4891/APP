import style from "./productQuestions.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserRoll } from "../../redux/actions";
import { nonAuthUser } from "../../utils";

const ProductQuestions = () => {

    const [ inputText, setInputText ] = useState("");
    const [ userQuestions, setUserQuestions] = useState([]);
    const [ questionSelect, setQuestionSelect] = useState({});
    const [ limit, setLimit ] = useState(true);
    const dispatch = useDispatch();
    const admData = useSelector(state=> state.admData);
    const  productQuestion = {}
    const  adminResponse = {}
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    const userName = Cookies.get("userName");
    const { id } = useParams();
    const [ lengthData, setLengthData ] = useState(0);
    const navigate = useNavigate();

    const getQuestions = async() => {
        try {
            const { data } = await axios(`/questions/${id}`);
            if (data.length > 3 && limit ) {
                setLengthData(data.length)
                const results = data.slice(0,3)
                setUserQuestions(results);
            }
            else setUserQuestions(data);
        } catch (error) {
            console.log(error.message);
        }
    }  

    const postQuestion = async (productQuestion) => {
        try {
            const { data } = await axios.post(`/questions`, productQuestion);
            if (data.question) {
                getQuestions();
                setInputText("");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteQuest = async (id) => {
        try {
            const { data } = await axios.delete(`/questions/${id}`)
            if (data === "Se borro con exito") await getQuestions();
        } catch (error) {
            console.log(error);
        }
    }

    const putResponseAdm = async (adminResponse) => {
        try {
            const { data } = await axios.put(`/questions`, adminResponse);
            if (data[0].response) {
                setUserQuestions(data);
                setQuestionSelect({})
                setInputText("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const findQuestion = (id) => {
       const question = userQuestions.find(item=> item.id === id);
       setQuestionSelect(question);
    }

    useEffect(()=>{
      getQuestions();
      dispatch(getUserRoll(userId));
    },[limit]);


    const submitQuestionRes = async (event) => {
       event.preventDefault();
       if (!token ) {
        const {isConfirmed} = await nonAuthUser();
        isConfirmed && navigate("/login");
        return;
       }
       if(!admData.userRoll){
           productQuestion.userId = userId;
           productQuestion.productId = id;
           productQuestion.userName = userName;
           productQuestion.userQuestion = inputText;
           postQuestion(productQuestion);
       }
       else{
           adminResponse.userId = admData.id;
           adminResponse.questionId = questionSelect.id
           adminResponse.responseQuestion = inputText;
           adminResponse.productId = id
           console.log(adminResponse);
           putResponseAdm(adminResponse);    
       }
    }

    const handleInput = (event) => {
        setInputText(event.target.value);
    }

    return (
        <div className={style.container}>
            <h3>{ userQuestions.length > 0 && "Preguntas"}</h3>
            { !admData.userRoll &&
                <form  className={style.formQuestions} onSubmit={submitQuestionRes}>
                    <label htmlFor="userQuestion">Deja tu pregunta:</label>
                    <textarea 
                    id="userQuestion"
                    type="text" 
                    name="userQuestion" 
                    value={inputText} 
                    onChange={handleInput} 
                    className={style.inpQuestion}
                    />
                    <button disabled={inputText === "" ? true : false}>
                        Preguntar
                    </button>
                </form>

            }
            { userQuestions.map((question)=>{
                return(
                    <div key={question.id} className={style.contQuestion}>
                        { questionSelect.id === question.id &&
                            <div  className={style.containFormRes}>
                                <form onSubmit={submitQuestionRes} className={style.formResponse}>   
                                   <p className={style.questionSelect}>{questionSelect.question}</p>
                                    <label htmlFor="resAdm">Responder: </label>
                                    <textarea 
                                        id="resAdm"
                                        type="text" 
                                        name="resAdm" 
                                        value={inputText} 
                                        onChange={handleInput} 
                                    />
                                    <div className={style.containBtn}>
                                        <button 
                                        className={style.btnRes}
                                        disabled={inputText === "" ? true : false}
                                        >Responder</button>
                                        <button 
                                         onClick={()=>setQuestionSelect({}, setInputText(""))} 
                                         className={style.btnCancel}
                                        >Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        }
                        <div className={style.questions}>
                            <p className={style.questionContain}>{question.question} </p>
                            { admData.userRoll && 
                              <button onClick={()=>deleteQuest(question.id)} className={style.btnDel}>X</button>
                            }
                            { admData.userRoll && !question.response && 
                            <button 
                             onClick={()=>findQuestion(question.id)}
                             className={questionSelect.id ? style.btnHiden : style.btnVisible}
                            >Responder</button> 
                            }
                        </div>
                        {question.answered && 
                            <div className={style.containRespon}>
                                <p>{question.response}</p>
                                <p className={style.date}>
                                    {question.createdAt.slice(0, 10).split("-").reverse().join("/")}
                                </p>
                            </div>
                        }
                    </div>
                )
            })} 
            { lengthData > 3 &&
                <p onClick={()=>setLimit(!limit)} className={style.limitQuestion}>
                  {limit ? `Todas las preguntas`: `Ver las últimas` }
                </p>
            }
        </div>
    );
}

export default ProductQuestions;