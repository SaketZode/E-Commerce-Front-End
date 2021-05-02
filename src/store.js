import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductListReducer, ProductDetailsReducer } from "./reducers/ProductListReducer";
import { CartReducer } from "./reducers/CartReducer";
import { UserLoginReducer, UserRegisterReducer, UserProfileReducer, UserProfileUpdateReducer } from "./reducers/UserReducer";


const reducer = combineReducers({
    productReducer: ProductListReducer,
    productDetailsReducer: ProductDetailsReducer,
    cartReducer: CartReducer,
    userReducer: UserLoginReducer,
    userInfo: UserRegisterReducer,
    userProfile: UserProfileReducer,
    updatedUserProfile: UserProfileUpdateReducer
})

const itemsInCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cartReducer: { cartItems: itemsInCart },
    userReducer: { user: userInfo },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;

