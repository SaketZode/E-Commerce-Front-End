import axios from "axios"
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
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_FAIL,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	UPDATE_USER_DETAILS_REQUEST,
	UPDATE_USER_DETAILS_SUCCESS,
	UPDATE_USER_DETAILS_FAIL,
} from "../constants/UserConstants"

export const UserLoginAction = (username, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}

		const { data } = await axios.post(
			"/user/login/",
			{
				username: username,
				password: password,
			},
			config
		)

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem("userInfo", JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const UserLogoutAction = () => async (dispatch) => {
	dispatch({
		type: USER_LOGOUT,
	})
	dispatch({
		type: USER_PROFILE_RESET,
	})
	localStorage.removeItem("userInfo")
}

export const UserRegisterAction = (name, username, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}

		const { data } = await axios.post(
			"/user/register/",
			{
				name: name,
				username: username,
				email: email,
				password: password,
			},
			config
		)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const UserProfileAction = () => async (dispatch, getState) => {
	console.log("user-profile-action")
	try {
		dispatch({
			type: USER_PROFILE_REQUEST,
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

		const { data } = await axios.get(`/user/profile/`, config)

		dispatch({
			type: USER_PROFILE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_PROFILE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const UpdateUserProfileAction = (updateduser) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_PROFILE_UPDATE_REQUEST,
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

		const { data } = axios.put("/user/profile/update/", updateduser, config)

		dispatch({
			type: USER_PROFILE_UPDATE_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem("userInfo", JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_PROFILE_UPDATE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const GetUsersList = (pageno) => async (dispatch, getState) => {
	if (pageno === null) {
		pageno = 1
	}
	try {
		dispatch({
			type: USER_LIST_REQUEST,
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

		const { data } = await axios.get(`/user/list/?page=${pageno}`, config)

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const DeleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
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

		const { data } = await axios.delete(`/user/delete/${id}`, config)

		dispatch({
			type: USER_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const GetUserById = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/user/details/${id}`, config)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}

export const UpdateUserDetails = (updatedUser) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_USER_DETAILS_REQUEST,
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

		const { data } = await axios.put(`/user/update/${updatedUser.id}`, updatedUser, config)

		dispatch({
			type: UPDATE_USER_DETAILS_SUCCESS,
			payload: data,
		})

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: UPDATE_USER_DETAILS_FAIL,
			payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
		})
	}
}
