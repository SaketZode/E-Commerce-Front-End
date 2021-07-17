import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_RESET,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_RESET,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_DETAILS_RESET,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	TOP_PRODUCTS_SUCCESS,
	TOP_PRODUCTS_FAIL,
	TOP_PRODUCTS_REQUEST,
} from "../constants/ProductListConstants"

export const ProductListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return {
				loading: true,
				products: [],
			}

		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload.results,
				total_pages: action.payload.total_pages,
				next: action.payload.next,
				previous: action.payload.previous,
			}

		case PRODUCT_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export const ProductDetailsReducer = (state = { product: { productReviews: [] } }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
			}

		case PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			}

		case PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case PRODUCT_DETAILS_RESET:
			return {
				product: { productReviews: [] },
			}

		default:
			return state
	}
}

export const ProductDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return {
				loading: true,
				success: false,
			}

		case PRODUCT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			}

		case PRODUCT_DELETE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case PRODUCT_DELETE_RESET:
			return {}

		default:
			return state
	}
}

export const ProductUpdateReducer = (state = { updatedProduct: {} }, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return {
				loading: true,
			}

		case PRODUCT_UPDATE_SUCCESS:
			return {
				loading: false,
				updatedProduct: action.payload,
				success: true,
			}

		case PRODUCT_UPDATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case PRODUCT_UPDATE_RESET:
			return {
				updatedProduct: {},
			}

		default:
			return state
	}
}

export const CreateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return {
				loading: true,
			}

		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				loading: false,
				success: true,
				review: action.payload,
			}

		case PRODUCT_CREATE_REVIEW_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			}

		case PRODUCT_CREATE_REVIEW_RESET:
			return {}

		default:
			return state
	}
}

export const ProductCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return {
				loading: true,
			}

		case PRODUCT_CREATE_SUCCESS:
			return {
				loading: false,
				product: action.payload,
				success: true,
			}

		case PRODUCT_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			}

		case PRODUCT_CREATE_RESET:
			return {}

		default:
			return state
	}
}

export const TopProductsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case TOP_PRODUCTS_REQUEST:
			return {
				loading: true,
			}

		case TOP_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			}

		case TOP_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
