import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_RESET,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_RESET,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
	ORDER_HISTORY_REQUEST,
	ORDER_HISTORY_FAIL,
	ORDER_HISTORY_SUCCESS,
	ORDER_HISTORY_RESET,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_RESET,
	ORDER_DELIVERY_REQUEST,
	ORDER_DELIVERY_SUCCESS,
	ORDER_DELIVERY_FAIL,
	ORDER_DELIVERY_RESET,
} from "../constants/OrderConstants"

export const OrderReducer = (state = { orderDetails: {} }, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			}

		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				orderDetails: action.payload,
			}

		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			}

		case ORDER_CREATE_RESET:
			return {
				orderDetails: {},
			}

		default:
			return state
	}
}

export const OrderDetailsReducer = (state = { loading: true, orderDetails: null }, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				loading: true,
			}

		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				orderDetails: action.payload,
			}

		case ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case ORDER_DETAILS_RESET:
			return {
				loading: true,
				orderDetails: null,
			}

		default:
			return state
	}
}

export const PaymentReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			}

		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				paymentDetail: action.payload,
			}

		case ORDER_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case ORDER_PAY_RESET:
			return {}

		default:
			return state
	}
}

export const OrderHistory = (state = { orderHistory: [] }, action) => {
	switch (action.type) {
		case ORDER_HISTORY_REQUEST:
			return {
				loading: true,
			}

		case ORDER_HISTORY_SUCCESS:
			return {
				loading: false,
				orderHistory: action.payload.results,
				total_pages: action.payload.total_pages,
				previous: action.payload.previous,
				next: action.payload.next,
			}

		case ORDER_HISTORY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case ORDER_HISTORY_RESET:
			return {
				orderHistory: [],
			}

		default:
			return state
	}
}

export const OrderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return {
				loading: true,
			}

		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload.results,
				total_pages: action.payload.total_pages,
				previous: action.payload.previous,
				next: action.payload.next,
			}

		case ORDER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case ORDER_LIST_RESET:
			return {
				orders: [],
			}

		default:
			return state
	}
}

export const OrderDeliveryReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVERY_REQUEST:
			return {
				loading: true,
			}

		case ORDER_DELIVERY_SUCCESS:
			return {
				loading: false,
				deliveryStatus: true,
				orderDetails: action.payload,
			}

		case ORDER_DELIVERY_FAIL:
			return {
				loading: false,
				deliveryStatus: false,
				error: action.payload,
			}

		case ORDER_DELIVERY_RESET:
			return {}

		default:
			return state
	}
}
