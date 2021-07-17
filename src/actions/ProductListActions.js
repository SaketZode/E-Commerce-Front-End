import axios from "axios"
import {
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	TOP_PRODUCTS_REQUEST,
	TOP_PRODUCTS_SUCCESS,
	TOP_PRODUCTS_FAIL,
} from "../constants/ProductListConstants"

export const listProducts = (searchkey, pageNo) => async (dispatch) => {
	if (searchkey === null) {
		searchkey = ""
	}
	if (pageNo === null) {
		pageNo = 1
	}

	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		})

		const { data } = await axios.get(`/products/?searchtext=${searchkey}&page=${pageNo}`)

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAILS_REQUEST,
		})

		const { data } = await axios.get(`/products/${id}`)

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
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

		const { data } = await axios.delete(`/product/delete/${id}`, config)

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const UpdateProduct = (updatedProduct) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/product/update/${updatedProduct.id}`, updatedProduct, config)

		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const CreateProductReview = (productId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_REQUEST,
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

		const { data } = await axios.post(`/product/review/create/${productId}`, review, config)

		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const CreateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		})

		const {
			userReducer: { user },
		} = getState()

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${user.access}`,
			},
		}

		const { data } = await axios.post(`/product/create/`, product, config)

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const GetTopProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: TOP_PRODUCTS_REQUEST,
		})

		const { data } = await axios.get(`/bestproducts`)

		dispatch({
			type: TOP_PRODUCTS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: TOP_PRODUCTS_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}
