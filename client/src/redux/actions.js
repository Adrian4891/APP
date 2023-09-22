import axios from "axios";
import { 
    GET_CART,
    ADD_CART, 
    REMOVE_CART, 
    RESET_CART,
    EDIT_CART,
    GET_FAVORITES,
    ADD_FAVORITES,
    REMOVE_FAVORITES,
    RESET_FAVS,
    CREATE_COMPRA,
    CANCEL_COMPRA,
    VERIFIED_ADMIN,
    RESET_ADMIN_DATA
} from "./actionsTypes";

export const getCart =  (id) => {
    try {
        return async(dispatch)=>{
           const { data } = await axios(`/cart/${id}`);
           if(!data.length) throw Error("No hay productos en el carrito");
           return (dispatch({
              type:GET_CART,
              payload: data
           }));
        }  
    } catch (error) {
        console.log(error.message); 
    }
}

export const addCart =  (id, productCart) => {
    try {
        return async (dispatch)=>{
            const { data } = await axios.post(`/cart/${id}`,productCart);
            if(!data) throw Error("algo salio mal");
            return(dispatch({
               type: ADD_CART,
               payload: data
            }));
        }
    } catch (error) { 
       console.log(error.message); 
    }
}

export const removeProduct = (id, product) => {
    try {
        return async(dispatch)=>{
            const { data } = await axios.delete(`/cart/${id}/${product}`);
            if(!data) throw Error("algo salio mal");
            return(dispatch({
                type: REMOVE_CART,
                payload: data
            }));
        }
    } catch (error) {
        
    }
}

export const editAmount = (id, product) => {
    try {
        return async (dispatch) => {
            const { data } = await axios.put(`/cart/${id}`,product);
            if (!data) throw Error("algo fallo");
            return (dispatch({
              type: EDIT_CART,
              payload: data
            }));
        }
    } catch (error) {
        console.log(error)
    }
}

export const resetCart = () => {
    return {
        type: RESET_CART,
        payload: []
    }

}

//--------------Favorites---------------------//

export const getFavs = (id) => {
    try {
      return async (dispatch)=>{
        const { data } = await axios(`/favorites/${id}`);
        if(!data) throw Error("No hay favoritos");
        return (dispatch({
            type: GET_FAVORITES,
            payload: data
        }));
      }
    } catch (error) {
        console.log(error);
    }
}

export const addFavs = (favorite) => {
    try {
        return async (dispatch) => {
            const { data } = await axios.post(`/favorites`, favorite);
            if(!data) throw Error("No se agrego el fav");
            return (dispatch({
                type: ADD_FAVORITES,
                payload: data
            }));
        }
    } catch (error) {
        console.log(error);
    }
}

export const removeFav = (id, productId) => {
    try {
        return async (dispatch) => {
           const { data } = await axios.delete(`/favorites/${id}/${productId}`);
           if(!data) throw Error("No existe el fav");
           return (dispatch({
              type: REMOVE_FAVORITES,
              payload: data
           }));
        }
    } catch (error) {
        console.log(error);
    }
}

export const resetFavs = () => {
    return {
        type: RESET_FAVS,
        payload: []
    }

}


///---- CREAR Y BORRAR PAYMENTS ---////

export const createOrderPayment = (order) => {
    if(order){
        return {
            type: CREATE_COMPRA,
            payload: order
        }
    }
}

export const cancelOrderPayment = () => {
    return {
        type: CANCEL_COMPRA,
        payload: []
    }
}


/////////////////////////7
export const getUserRoll = (id) => {
    try {
        return async (dispatch) => {
            const { data } = await axios(`/user/${id}`);
            if (!data.userRoll) throw Error("No estas autorizado");
            return (dispatch({
              type: VERIFIED_ADMIN,
              payload: data
            }));
       }
    } catch (error) {
        console.log(error);
    }
}

export const resetSesionAdm = () => {
    return {
        type: RESET_ADMIN_DATA,
        payload: {}
    }
}