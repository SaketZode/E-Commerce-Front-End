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
	USER_PROFILE_UPDATE_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	UPDATE_USER_DETAILS_REQUEST,
	UPDATE_USER_DETAILS_SUCCESS,
	UPDATE_USER_DETAILS_FAIL,
	UPDATE_USER_DETAILS_RESET,
} from "../constants/UserConstants"

export const UserLoginReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				loading: true,
			}

		case USER_LOGIN_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}

		case USER_LOGIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case USER_LOGOUT:
			return {}

		default:
			return state
	}
}

export const UserRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return {
				loading: true,
				user: {},
			}

		case USER_REGISTER_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}

		case USER_REGISTER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export const UserProfileReducer = (state = { userProfile: {} }, action) => {
	switch (action.type) {
		case USER_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			}

		case USER_PROFILE_SUCCESS:
			return {
				loading: false,
				userProfile: action.payload,
			}

		case USER_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case USER_PROFILE_RESET:
			return {
				userProfile: {},
			}

		default:
			return state
	}
}

export const UserProfileUpdateReducer = (state = { updatedProfile: {} }, action) => {
	switch (action.type) {
		case USER_PROFILE_UPDATE_REQUEST:
			return {
				loading: true,
			}

		case USER_PROFILE_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				updatedProfile: action.payload,
			}

		case USER_PROFILE_UPDATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case USER_PROFILE_UPDATE_RESET:
			return {}

		default:
			return state
	}
}

export const UserListReducer = (state = { userlist: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return {
				loading: true,
			}

		case USER_LIST_SUCCESS:
			return {
				loading: false,
				userlist: action.payload.results,
				previous: action.payload.previous,
				next: action.payload.next,
				total_pages: action.payload.total_pages,
			}

		case USER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case USER_LIST_RESET:
			return {
				userlist: [],
			}

		default:
			return state
	}
}

export const UserDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return {
				loading: true,
				success: false,
			}

		case USER_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			}

		case USER_DELETE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export const UserDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				loading: true,
			}

		case USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}

		case USER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		case USER_DETAILS_RESET:
			return {
				user: null,
			}

		default:
			return state
	}
}

export const UserUpdateReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case UPDATE_USER_DETAILS_REQUEST:
			return {
				loading: true,
			}

		case UPDATE_USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: action.payload,
				success: true,
			}

		case UPDATE_USER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			}

		case UPDATE_USER_DETAILS_RESET:
			return {
				user: {},
			}

		default:
			return state
	}
}
