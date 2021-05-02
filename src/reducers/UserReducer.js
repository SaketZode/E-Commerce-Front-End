import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_RESET
} from '../constants/UserConstants'


export const UserLoginReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            }

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {

            }

        default:
            return state
    }
}


export const UserRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
                user: {}
            }

        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const UserProfileReducer = (state = { userProfile: {} }, action) => {
    switch(action.type) {
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case USER_PROFILE_SUCCESS:
            return {
                loading: false,
                userProfile: action.payload
            }

        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_PROFILE_RESET:
            return {
                userProfile: {}
            }

        default:
            return state
    }
}

export const UserProfileUpdateReducer = (state = { updatedProfile: {} }, action) => {
    switch(action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return {
                loading: true
            }

        case USER_PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                updatedProfile: action.payload
            }

        case USER_PROFILE_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case USER_PROFILE_UPDATE_RESET:
            return {

            }
        
        default:
            return state
    }
}