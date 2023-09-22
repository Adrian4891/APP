import { 
    GET_CART,
    ADD_CART, 
    REMOVE_CART, 
    EDIT_CART,
    RESET_CART,
    GET_FAVORITES,
    ADD_FAVORITES,
    REMOVE_FAVORITES,
    RESET_FAVS,
    CREATE_COMPRA,
    CANCEL_COMPRA,
    VERIFIED_ADMIN,
    RESET_ADMIN_DATA 
} from "./actionsTypes";

const initialState = {
    allProducts: [],
    productsCart: [],
    productsFav: [],
    order: [],
    admData: {}
}

export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_CART:
             return {...state, productsCart: action.payload};

        case ADD_CART:
            return  {...state, productsCart: action.payload};

        case REMOVE_CART: 
            return {...state, productsCart: action.payload};

        case EDIT_CART: 
            return {...state, productsCart: action.payload};

        case RESET_CART :  
            return {...state, productsCart: action.payload};

        case GET_FAVORITES :
            return {...state, productsFav: action.payload};
        
        case ADD_FAVORITES: 
            return {...state, productsFav: action.payload};

        case REMOVE_FAVORITES: 
            return {...state, productsFav: action.payload};

        case RESET_FAVS: 
            return {...state, productsFav: action.payload};

        case CREATE_COMPRA: 
            return {...state, order: action.payload}

        case CANCEL_COMPRA:
            return {...state, order: action.payload}

        case VERIFIED_ADMIN:
            return {...state, admData: action.payload}

        case RESET_ADMIN_DATA:
            return {...state, admData: action.payload}
    
        default:
            return {...state};
    }
}

