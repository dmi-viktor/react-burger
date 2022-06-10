import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR
} from '../actions/burger-ingredients';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                itemsFailed: false,
                items: action.items.data,
                itemsRequest: false
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false
            };
        }
        default: {
            return state;
        }
    }
};