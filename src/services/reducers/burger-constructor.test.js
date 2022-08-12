import { burgerConstructorReducer, initialState } from './burger-constructor.ts';
import * as types from '../actions/burger-constructor';

describe('todos burger constructor reducer', () => {

    test('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
    })

    test('should handle ADD_TO_CONSTRUCTOR', () => {
        expect(
            burgerConstructorReducer(initialState, {
                type: types.ADD_TO_CONSTRUCTOR,
                ingredientData: {
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
                    uuid: "c710146b-82ed-4bb7-b3e1-ab63c3ea35c3",
                    __v: 0,
                    _id: "60d3b41abdacab0026a733c7"
                }
            })
        ).toEqual(
            {
                constructorItems:
                    [
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
                            uuid: "c710146b-82ed-4bb7-b3e1-ab63c3ea35c3",
                            __v: 0,
                            _id: "60d3b41abdacab0026a733c7"
                        }
                    ]
            }
        )
    });

    test('should handle REMOVE_FROM_CONSTRUCTOR', () => {
        expect(
            burgerConstructorReducer({
                constructorItems:
                [
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
                        uuid: "c710146b-82ed-4bb7-b3e1-ab63c3ea35c3",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c7"
                    }
                ]
            }, {
                type: types.REMOVE_FROM_CONSTRUCTOR,
                ingredientData: {
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
                    uuid: "c710146b-82ed-4bb7-b3e1-ab63c3ea35c3",
                    __v: 0,
                    _id: "60d3b41abdacab0026a733c7"
                }
            })
        ).toEqual({ constructorItems: []})
    });

    test('should handle REMOVE_ALL_FROM_CONSTRUCTOR', () => {
        expect(
            burgerConstructorReducer({
                constructorItems:
                [
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
                        uuid: "c710146b-82ed-4bb7-b3e1-ab63c3ea35c3",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733c7"
                    }
                ]
            }, {
                type: types.REMOVE_ALL_FROM_CONSTRUCTOR
            })
        ).toEqual({ constructorItems: []})
    });

    test('should handle MOVE_IN_CONSTRUCTOR', () => {
        expect(
            burgerConstructorReducer({
                constructorItems:
                [
                    {
                        calories: 99,
                        carbohydrates: 42,
                        fat: 24,
                        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
                        image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
                        name: "Соус традиционный галактический",
                        price: 15,
                        proteins: 42,
                        type: "sauce",
                        uuid: "d442f728-b0af-4348-8b28-7e5e4e83bb7b",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733ce"
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
                        uuid: "fad965c3-8d24-485b-9948-91c1131f2aa6",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733cd"
                    }
                ]
            }, {
                type: types.MOVE_IN_CONSTRUCTOR,
                dragIndex: 1,
                hoverIndex: 0
            })
        ).toEqual(
            { 
                constructorItems: [
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
                        uuid: "fad965c3-8d24-485b-9948-91c1131f2aa6",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733cd"
                    },
                    {
                        calories: 99,
                        carbohydrates: 42,
                        fat: 24,
                        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
                        image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
                        image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
                        name: "Соус традиционный галактический",
                        price: 15,
                        proteins: 42,
                        type: "sauce",
                        uuid: "d442f728-b0af-4348-8b28-7e5e4e83bb7b",
                        __v: 0,
                        _id: "60d3b41abdacab0026a733ce"
                    }
                ]
            }
        )
    });
}) 