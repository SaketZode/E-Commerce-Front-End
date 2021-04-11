import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductListReducer, ProductDetailsReducer } from "./reducers/ProductListReducer";
import { CartReducer } from "./reducers/CartReducer";


const reducer = combineReducers({
    productReducer: ProductListReducer,
    productDetailsReducer: ProductDetailsReducer,
    cartReducer: CartReducer,
})

const itemsInCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cartReducer: { cartItems: itemsInCart }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;

