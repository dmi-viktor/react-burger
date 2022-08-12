import { orderReducer, initialState } from './order-details.ts';
import * as types from '../actions/order-details';

describe('todos order reducer', () => {

    test('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    });

    test('should handle CREATE_ORDER_REQUEST', () => {
        expect(
            orderReducer(initialState, {
                type: types.CREATE_ORDER_REQUEST
            })
        ).toEqual(
            {
                orderDetails: null,
                itemsRequest: true,
                itemsFailed: false
            }
        )
    });

    test('should handle CREATE_ORDER_ERROR', () => {
        expect(
            orderReducer(initialState, {
                type: types.CREATE_ORDER_ERROR
            })
        ).toEqual(
            {
                orderDetails: null,
                itemsRequest: false,
                itemsFailed: true
            }
        )
    });

    test('should handle CREATE_ORDER_CLEAR', () => {
        expect(
            orderReducer({
                orderDetails: {
                    name: "Space флюоресцентный бургер",
                    order:{
                            createdAt: "2022-08-08T16:14:46.286Z",
                            ingredients: [
                                {
                                    calories: 643,
                                    carbohydrates: 85,
                                    fat: 26,
                                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                                    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                                    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                                    name: "Флюоресцентная булка R2-D3",
                                    price: 988,
                                    proteins: 44,
                                    type: "bun",
                                    __v: 0,
                                    _id: "60d3b41abdacab0026a733c7"
                                },
                                {
                                    calories: 14,
                                    carbohydrates: 11,
                                    fat: 22,
                                    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                                    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                                    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                                    name: "Соус фирменный Space Sauce",
                                    price: 80,
                                    proteins: 50,
                                    type: "sauce",
                                    __v: 0,
                                    _id: "60d3b41abdacab0026a733cd"
                                }
                            ],
                            name: "Space флюоресцентный бургер",
                            number: 22437,
                            owner: {name: 'FunnyMonkey', email: 'dmi-viktor@yandex.ru', createdAt: '2022-06-22T15:34:37.579Z', updatedAt: '2022-07-30T12:01:23.931Z'},
                            price: 1068,
                            status: "done",
                            updatedAt: "2022-08-08T16:14:46.568Z",
                            _id: "62f1367642d34a001c27f91a"
                    },
                    success: true
                },
                itemsRequest: false,
                itemsFailed: false
            }, {
                type: types.CREATE_ORDER_CLEAR
            })
        ).toEqual(
            {
                orderDetails: null,
                itemsRequest: false,
                itemsFailed: false
            }
        )
    });

    test('should handle CREATE_ORDER_SUCCESS', () => {
        expect(
            orderReducer({
                orderDetails: [],
                itemsRequest: false,
                itemsFailed: false
            }, {
                type: types.CREATE_ORDER_SUCCESS,
                details:{
                            name: "Space флюоресцентный бургер",
                            order:{
                                    createdAt: "2022-08-08T16:14:46.286Z",
                                    ingredients: [
                                        {
                                            calories: 643,
                                            carbohydrates: 85,
                                            fat: 26,
                                            image: "https://code.s3.yandex.net/react/code/bun-01.png",
                                            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                                            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                                            name: "Флюоресцентная булка R2-D3",
                                            price: 988,
                                            proteins: 44,
                                            type: "bun",
                                            __v: 0,
                                            _id: "60d3b41abdacab0026a733c7"
                                        },
                                        {
                                            calories: 14,
                                            carbohydrates: 11,
                                            fat: 22,
                                            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                                            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                                            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                                            name: "Соус фирменный Space Sauce",
                                            price: 80,
                                            proteins: 50,
                                            type: "sauce",
                                            __v: 0,
                                            _id: "60d3b41abdacab0026a733cd"
                                        }
                                    ],
                                    name: "Space флюоресцентный бургер",
                                    number: 22437,
                                    owner: {name: 'FunnyMonkey', email: 'dmi-viktor@yandex.ru', createdAt: '2022-06-22T15:34:37.579Z', updatedAt: '2022-07-30T12:01:23.931Z'},
                                    price: 1068,
                                    status: "done",
                                    updatedAt: "2022-08-08T16:14:46.568Z",
                                    _id: "62f1367642d34a001c27f91a"
                            },
                            success: true
                        }
            })
        ).toEqual(
            {
                orderDetails: {
                    name: "Space флюоресцентный бургер",
                    order:{
                            createdAt: "2022-08-08T16:14:46.286Z",
                            ingredients: [
                                {
                                    calories: 643,
                                    carbohydrates: 85,
                                    fat: 26,
                                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                                    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                                    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                                    name: "Флюоресцентная булка R2-D3",
                                    price: 988,
                                    proteins: 44,
                                    type: "bun",
                                    __v: 0,
                                    _id: "60d3b41abdacab0026a733c7"
                                },
                                {
                                    calories: 14,
                                    carbohydrates: 11,
                                    fat: 22,
                                    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
                                    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                                    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                                    name: "Соус фирменный Space Sauce",
                                    price: 80,
                                    proteins: 50,
                                    type: "sauce",
                                    __v: 0,
                                    _id: "60d3b41abdacab0026a733cd"
                                }
                            ],
                            name: "Space флюоресцентный бургер",
                            number: 22437,
                            owner: {name: 'FunnyMonkey', email: 'dmi-viktor@yandex.ru', createdAt: '2022-06-22T15:34:37.579Z', updatedAt: '2022-07-30T12:01:23.931Z'},
                            price: 1068,
                            status: "done",
                            updatedAt: "2022-08-08T16:14:46.568Z",
                            _id: "62f1367642d34a001c27f91a"
                    },
                    success: true
                },
                itemsRequest: false,
                itemsFailed: false
            }
        )
    });

}) 