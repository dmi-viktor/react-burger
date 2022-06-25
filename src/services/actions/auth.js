import { authorize, register, logout, getUserData, setUserData, setCookie } from '../../utils/burger-api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';

export const AUTH_ERROR = 'AUTH_ERROR';

const setAuthError = () => ({ type: AUTH_ERROR });

export function registerOnServer(email, password, name, func) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });

        register(email, password, name)
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        data: data
                    });

                    localStorage.setItem("refreshToken", data.refreshToken);
                    setCookie("accessToken", data.accessToken.substring(7));

                    func();
                }
                else {
                    dispatch(setAuthError());
                    func(data.message);
                }
            })
            .catch(e => {
                dispatch(setAuthError());
                func(e.message);
            });
    };
}

export function loginOnServer(email, password, func) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        authorize(email, password)
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: data
                    });
                    localStorage.setItem("refreshToken", data.refreshToken);
                    setCookie("accessToken", data.accessToken.substring(7));

                    func(true);
                }
                else {
                    dispatch(setAuthError());

                    func(false, data.message);
                }
            })
            .catch(e => {
                dispatch(setAuthError());

                func(false, e.message);
            });
    };
}

export function logoutOnServer(func) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        logout()
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: LOGOUT_SUCCESS,
                        data: data
                    });

                    localStorage.removeItem("refreshToken");
                    setCookie("accessToken", "", { 'max-age': -1 });
                    func();
                }
                else {
                    dispatch(setAuthError());
                }
            })
            .catch(e => {
                dispatch(setAuthError());
            });
    };
}

export function getUserDataFromServer() {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });

        getUserData()
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        data: data
                    });
                }
                else {
                    dispatch(setAuthError());
                }
            })
            .catch(e => {
                dispatch(setAuthError());
            });
    };
}

export function editUserDataOnServer(email, password, name, func) {
    return function (dispatch) {
        dispatch({
            type: EDIT_USER_REQUEST
        });

        setUserData(email, password, name)
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: EDIT_USER_SUCCESS,
                        data: data
                    });

                    func(true);
                }
                else {
                    dispatch(setAuthError());

                    func(false, data.message);
                }
            })
            .catch(e => {
                dispatch(setAuthError());

                func(false, e.message);
            });
    };
}

export function init() {
    localStorage.getItem("refreshToken");

}