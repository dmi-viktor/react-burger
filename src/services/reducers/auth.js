import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,

    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR
} from '../actions/auth';

const initialState = 
{
    isAuth: false,
    user: null,
    isRequest: false,
    isFailed: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case GET_USER_REQUEST:
        case EDIT_USER_REQUEST: {
            return {
                ...state,
                isRequest: true
            };
        }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case GET_USER_SUCCESS:
        case EDIT_USER_SUCCESS:{
            return {
                ...state,
                isFailed: false,
                isRequest: false,                
                isAuth: true,
                user: action.data.user
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isFailed: false,
                isRequest: false,
                isAuth: false,
                user: null
            };
        }
        case GET_USER_ERROR:
        case EDIT_USER_ERROR:
        case REGISTER_ERROR:
        case LOGIN_ERROR: {
            return {
                ...state,
                isFailed: false,
                isRequest: false,
                isAuth: false,
                user: null
            };
        }
        default: {
            return state;
        }
    }
};