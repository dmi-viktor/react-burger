import { authReducer, initialState } from './auth.ts';
import * as types from '../actions/auth';

describe('todos auth reducer', () => {

    test('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle REGISTER_REQUEST', () => {
        expect(
            authReducer({}, {
                type: types.REGISTER_REQUEST
            })
        ).toEqual(
            {
                isRequest: true,
            }
        )
    })

    test('should handle LOGIN_REQUEST', () => {
        expect(
            authReducer({}, {
                type: types.LOGIN_REQUEST
            })
        ).toEqual(
            {
                isRequest: true,
            }
        )
    })

    test('should handle LOGOUT_REQUEST', () => {
        expect(
            authReducer({}, {
                type: types.LOGOUT_REQUEST
            })
        ).toEqual(
            {
                isRequest: true,
            }
        )
    })

    test('should handle GET_USER_REQUEST', () => {
        expect(
            authReducer({}, {
                type: types.GET_USER_REQUEST
            })
        ).toEqual(
            {
                isRequest: true,
            }
        )
    })

    test('should handle EDIT_USER_REQUEST', () => {
        expect(
            authReducer({}, {
                type: types.EDIT_USER_REQUEST
            })
        ).toEqual(
            {
                isRequest: true,
            }
        )
    })

    test('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: types.LOGOUT_SUCCESS
            })
        ).toEqual(            
            {
                isFailed: false,
                isRequest: false,
                isAuth: false,
                user: null
            }
        )
    })

    test('should handle AUTH_ERROR', () => {
        expect(
            authReducer({}, {
                type: types.AUTH_ERROR
            })
        ).toEqual(            
            {
                isFailed: false,
                isRequest: false,
                isAuth: false,
                user: null
            }
        )
    })

    const testData = {
        accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjMzNjhkNDJkMzRhMDAxYzI2ZWM4NSIsImlhdCI6MTY1OTg5NDk5MCwiZXhwIjoxNjU5ODk2MTkwfQ.RQd1Z7XIUkB3pxGjJsLdV6LSq7n-a2TZCmPsZlpfv98",
        refreshToken: "2767ef2d1bc29c0804aed913ba02c519a81a8f0019fa2d767cd6a1077ece27382f7fe35a8d58c5a3",
        success: true,
        user: {
            email: "dmi-viktor@yandex.ru",
            name: "FunnyMonkey"
        }
    };

    const testResultData =
    {
        isFailed: false,
        isRequest: false,                
        isAuth: true,
        user: {
            email: "dmi-viktor@yandex.ru",
            name: "FunnyMonkey"
        }
    };

    test('should handle REGISTER_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: types.REGISTER_SUCCESS,
                data: testData
            })
        ).toEqual(            
            testResultData
        )
    });

    test('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: types.LOGIN_SUCCESS,
                data: testData
            })
        ).toEqual(            
            testResultData
        )
    });

    test('should handle GET_USER_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: types.GET_USER_SUCCESS,
                data: testData
            })
        ).toEqual(            
            testResultData
        )
    });

    test('should handle EDIT_USER_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: types.EDIT_USER_SUCCESS,
                data: testData
            })
        ).toEqual(            
            testResultData
        )
    });
}) 