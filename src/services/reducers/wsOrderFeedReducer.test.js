import { wsReducer, initialState } from './wsOrderFeedReducer.ts';
import * as types from '../actions/wsOrderFeedTypes';

describe('todos order feed reducer', () => {

const testOrders = {
                        orders: [
                                    {
                                        createdAt: "2022-08-08T16:38:43.331Z",
                                        ingredients: [
                                            "60d3b41abdacab0026a733c7",
                                            "60d3b41abdacab0026a733cd",
                                            "60d3b41abdacab0026a733cd",
                                            "60d3b41abdacab0026a733cd",
                                            "60d3b41abdacab0026a733cd",
                                            "60d3b41abdacab0026a733cd"
                                        ],
                                        length: 6,                    
                                        name: "Space флюоресцентный бургер",
                                        number: 22440,
                                        status: "done",
                                        updatedAt: "2022-08-08T16:38:43.581Z",
                                        _id: "62f13c1342d34a001c27f91f"
                                    }
                                ],
                        success: true,
                        total: 22353,
                        totalToday: 1
                    };

    test('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    });

    test('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer(initialState, {
                type: types.WS_CONNECTION_SUCCESS
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: true
            }
        )
    });


    test('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer({
                error: undefined,
                wsConnected: true
            }, {
                type: types.WS_CONNECTION_CLOSED
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false
            }
        )
    });

    test('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer({
                error: undefined,
                wsConnected: true
            }, {
                type: types.WS_CONNECTION_ERROR,
                payload: 'ошибка запроса'
            })
        ).toEqual(
            {
                error: 'ошибка запроса',
                wsConnected: false
            }
        )
    });

    test('should handle WS_GET_MESSAGE', () => {
        expect(
            wsReducer({
                error: undefined,
                wsConnected: true
            }, {
                type: types.WS_GET_MESSAGE,
                payload: testOrders
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: true,
                data: testOrders
            }
        )
    });
}) 