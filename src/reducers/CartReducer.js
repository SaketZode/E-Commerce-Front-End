import { ADD_TO_CART, CART_ADD_FAIL, CART_ADD_SHIPPING_ADDRESS, CART_REQUEST, REMOVE_FROM_CART, CART_ADD_PAYMENT_METHOD } from "../constants/CartConstants"

export const CartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: null }, action) => {
	switch (action.type) {
		case CART_REQUEST:
			return {
				loading: true,
				cartItems: [],
				shippingAddress: {},
			}

		case ADD_TO_CART:
			const item = action.payload
			const existsItem = state.cartItems.find((x) => x.product === item.product)

			if (existsItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => (x.product === existsItem.product ? item : x)),
					loading: false,
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
				error: action.payload,
			}

		case REMOVE_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
				loading: false,
			}

		case CART_ADD_SHIPPING_ADDRESS:
			return {
				...state,
				loading: false,
				shippingAddress: action.payload,
			}

		case CART_ADD_PAYMENT_METHOD:
			return {
				...state,
				loading: false,
				paymentMethod: action.payload,
			}

		default:
			return state
	}
}
