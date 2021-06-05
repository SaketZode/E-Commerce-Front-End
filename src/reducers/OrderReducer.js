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
    ORDER_HISTORY_RESET
} from '../constants/OrderConstants'

export const OrderReducer = (state = { orderDetails: {} }, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                orderDetails: action.payload
            }
        
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }

        case ORDER_CREATE_RESET:
            return {
                orderDetails: {}
            }

        default:
            return state
    }
}

export const OrderDetailsReducer = (state = { loading: true, orderDetails: null }, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                orderDetails: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DETAILS_RESET:
            return {
                loading: true,
                orderDetails: null
            }

        default:
            return state
    }
}

export const PaymentReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                paymentDetail: action.payload
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

export const OrderHistory = (state = { orderHistory: [] }, action) => {
    switch(action.type) {
        case ORDER_HISTORY_REQUEST:
            return {
                loading: true
            }

        case ORDER_HISTORY_SUCCESS:
            return {
                loading: false,
                orderHistory: action.payload
            }

        case ORDER_HISTORY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_HISTORY_RESET:
            return {
                orderHistory: []
            }

        default:
            return state
    }
}
