import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductListReducer, ProductDetailsReducer } from "./reducers/ProductListReducer";


const reducer = combineReducers({
    productReducer: ProductListReducer,
    productDetailsReducer: ProductDetailsReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;

