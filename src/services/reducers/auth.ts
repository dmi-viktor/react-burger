import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,

    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,

    AUTH_ERROR,

    TAuthActions
} from '../actions/auth';

type TAuthState = {
    isAuth: boolean;
    user: any,
    isRequest: boolean,
    isFailed: boolean
}

export const initialState: TAuthState = 
{
    isAuth: false,
    user: null,
    isRequest: false,
    isFailed: false,
};

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
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
        case AUTH_ERROR: {
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