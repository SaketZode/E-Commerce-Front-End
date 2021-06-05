import axios from 'axios'
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
    USER_PROFILE_UPDATE_SUCCESS
} from '../constants/UserConstants'


export const UserLoginAction = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/user/login/',
            {
                'username': username, 
                'password': password
            },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const UserLogoutAction = () => async (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_PROFILE_RESET
    })
    localStorage.removeItem('userInfo')
}


export const UserRegisterAction = (name, username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const { data } = await axios.post(
            '/user/register/',
            {
                'name': name,
                'username': username,
                'email': email,
                'password': password
            },
            config
        )
    
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }  
}

export const UserProfileAction = () => async (dispatch, getState) => {
    console.log('user-profile-action')
    try {
        dispatch({
            type: USER_PROFILE_REQUEST
        })

        const { 
            userReducer: { user },
        } = getState() 

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access}`
            }
        }

        const { data } = await axios.get(
            `/user/profile/`,
            config
        )

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const UpdateUserProfileAction = (updateduser) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST
        })

        const {
            userReducer: { user }
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access}`
            }
        }

        const { data } = axios.put(
            '/user/profile/update/',
            updateduser,
            config
        )

        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}
