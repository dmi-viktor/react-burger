import { ingredientsReducer, initialState } from './burger-ingredients.ts';
import * as types from '../actions/burger-ingredients';

describe('todos burger ingredients reducer', () => {

    const testIngredients = [
        {
            calories: 420,
            carbohydrates: 53,
            fat: 24,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            name: "Краторная булка N-200i",
            price: 1255,
            proteins: 80,
            type: "bun",
            __v: 0,
            _id: "60d3b41abdacab0026a733c6"
        },
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
        }
    ];

    test('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    });

    test('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(initialState, {
                type: types.GET_INGREDIENTS_REQUEST
            })
        ).toEqual(
            {
                items: [],
                itemsRequest: true,
                itemsFailed: false
            }
        )
    });

    test('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            ingredientsReducer(initialState, {
                type: types.GET_INGREDIENTS_ERROR
            })
        ).toEqual(
            {
                items: [],
                itemsRequest: false,
                itemsFailed: true
            }
        )
    });

    
    test('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer(initialState, {
                type: types.GET_INGREDIENTS_SUCCESS,
                items: testIngredients
            })
        ).toEqual(
            {
                items: testIngredients,
                itemsRequest: false,
                itemsFailed: false
            }
        )
    });
}) 