import { wsOrderHistoryReducer, initialState } from './wsOrderHistoryReducer.ts';

describe('todos order history reducer', () => {

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
        expect(wsOrderHistoryReducer(undefined, {})).toEqual(initialState)
    });

    test('should handle WS_ORDER_HISTORY_CONNECTION_SUCCESS', () => {
        expect(
            wsOrderHistoryReducer(initialState, {
                type: 'WS_ORDER_HISTORY_CONNECTION_SUCCESS'
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: true
            }
        )
    });

    test('should handle WS_ORDER_HISTORY_CONNECTION_CLOSED', () => {
        expect(
            wsOrderHistoryReducer({
                error: undefined,
                wsConnected: true
            }, {
                type: 'WS_ORDER_HISTORY_CONNECTION_CLOSED'
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false
            }
        )
    });

    test('should handle WS_ORDER_HISTORY_CONNECTION_ERROR', () => {
        expect(
            wsOrderHistoryReducer({
                error: undefined,
                wsConnected: true
            }, {
                type: 'WS_ORDER_HISTORY_CONNECTION_ERROR',
                payload: 'ошибка запроса'
            })
        ).toEqual(
            {
                error: 'ошибка запроса',
                wsConnected: false
            }
        )
    });

    test('should handle WS_ORDER_HISTORY_GET_MESSAGE', () => {
        expect(
            wsOrderHistoryReducer({
                error: undefined,
                wsConnected: true
            }, {
                type: 'WS_ORDER_HISTORY_GET_MESSAGE',
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