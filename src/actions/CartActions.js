import axios from "axios"
import { 
    ADD_TO_CART,
    CART_REQUEST,
    CART_ADD_FAIL,
    REMOVE_FROM_CART,
    REMOVE_FROM_CART_FAIL
} from "../constants/CartConstants"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REQUEST
        })
    
        const { data } = await axios.get(`/products/${id}`)

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }    
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
    } catch (error) {
        dispatch({
            type: CART_ADD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const removeFromCart = (id) => (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REQUEST
        })

        dispatch({
            type: REMOVE_FROM_CART,
            payload: id,
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
    } catch (error) {
        dispatch({
            type: REMOVE_FROM_CART_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}