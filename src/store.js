import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { ProductListReducer, TopProductsReducer, ProductDetailsReducer, ProductDeleteReducer, ProductUpdateReducer, CreateReviewReducer, ProductCreateReducer } from "./reducers/ProductListReducer"
import { CartReducer } from "./reducers/CartReducer"
import { UserLoginReducer, UserRegisterReducer, UserProfileReducer, UserProfileUpdateReducer, UserListReducer, UserDeleteReducer, UserDetailsReducer, UserUpdateReducer } from "./reducers/UserReducer"
import { OrderReducer, OrderDetailsReducer, PaymentReducer, OrderHistory, OrderListReducer, OrderDeliveryReducer } from "./reducers/OrderReducer"

const reducer = combineReducers({
	productReducer: ProductListReducer,
	topProducts: TopProductsReducer,
	productDetailsReducer: ProductDetailsReducer,
	productCreateReducer: ProductCreateReducer,
	productDelete: ProductDeleteReducer,
	productUpdate: ProductUpdateReducer,
	productReview: CreateReviewReducer,
	cartReducer: CartReducer,
	userReducer: UserLoginReducer,
	userInfo: UserRegisterReducer,
	userProfile: UserProfileReducer,
	updatedUserProfile: UserProfileUpdateReducer,
	userList: UserListReducer,
	userDetails: UserDetailsReducer,
	userDelete: UserDeleteReducer,
	updateUser: UserUpdateReducer,
	order: OrderReducer,
	orderDetail: OrderDetailsReducer,
	paymentStatus: PaymentReducer,
	orderHistory: OrderHistory,
	orderList: OrderListReducer,
	orderDelivery: OrderDeliveryReducer,
})

const itemsInCart = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressinStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const initialState = {
	cartReducer: { cartItems: itemsInCart, shippingAddress: shippingAddressinStorage },
	userReducer: { user: userInfo },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
