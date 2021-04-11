import {
    ADD_TO_CART,
    CART_ADD_FAIL,
    CART_REQUEST,
    REMOVE_FROM_CART
} from '../constants/CartConstants'

export const CartReducer = (state = { cartItems:[] }, action) => {
    switch(action.type) {
        case CART_REQUEST:
            return {
                loading: true,
                cartItems: []
            }

        case ADD_TO_CART:
            const item = action.payload
            const existsItem = state.cartItems.find((x) => x.product === item.product)

            if(existsItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existsItem.product ? item : x),
                    loading: false
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    loading: false,
                }
            }

        case CART_ADD_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload),
                loading: false
            }
        
        default:
            return state
    }
}