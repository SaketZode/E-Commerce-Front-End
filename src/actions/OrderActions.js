import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_RESET,
	ORDER_HISTORY_REQUEST,
	ORDER_HISTORY_SUCCESS,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVERY_REQUEST,
	ORDER_DELIVERY_SUCCESS,
	ORDER_DELIVERY_FAIL,
} from "../constants/OrderConstants"
import axios from "axios"

export const createOrderAction = (orderDetails) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		})

		const {
			userReducer: { user },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.access}`,
			},
		}

		const { data } = await axios.post("/order/place/", orderDetails, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.detail,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		})

		const {
			userReducer: { user },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.access}`,
			},
		}

		const { data } = await axios.get(`/order/details/${id}`, config)

		console.log(data)
		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const PaymentAction = (id, paymentInfo) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		})

		const {
			userReducer: { user },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.access}`,
			},
		}

		const { data } = await axios.put(`/order/${id}/pay/`, paymentInfo, config)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const getOrderHistory = (pageNo) => async (dispatch, getState) => {
	if (pageNo === null) {
		pageNo = 1
	}
	try {
		dispatch({
			type: ORDER_HISTORY_REQUEST,
		})

		const {
			userReducer: { user },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.access}`,
			},
		}

		const { data } = await axios.get(`/order/history/?page=${pageNo}`, config)

		dispatch({
			type: ORDER_HISTORY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const ListOrdersAction = (pageNo) => async (dispatch, getState) => {
	if (pageNo === null) {
		pageNo = 1
	}
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		})

		const {
			userReducer: { user },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.access}`,
			},
		}
		/*?page=${pageNo}*/
		const { data } = await axios.get(`/orders/?page=${pageNo}`, config)

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const DeliverOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVERY_REQUEST,
		})

		const {
			userReducer: { user },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.access}`,
			},
		}

		const { data } = await axios.put(`/order/deliver/${orderId}`, null, config)

		dispatch({
			type: ORDER_DELIVERY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_DELIVERY_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}
