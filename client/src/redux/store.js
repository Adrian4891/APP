import {applyMiddleware,legacy_createStore,compose} from "redux";
import  thunkMiddleware  from "redux-thunk";
import { reducer } from "./reducer"


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // conecta la app con la extension 

const store = legacy_createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // esto es para poder hacer peticiones a una api/ servidor
);  // es el traductor entre el servidor y cliente

export default store;