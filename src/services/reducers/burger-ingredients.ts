import { TIngredient } from '../../utils/types'
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    TGetIngredientsActions
} from '../actions/burger-ingredients';

type TIngredientsState = {
    items: ReadonlyArray<TIngredient>;
    itemsRequest: boolean;
    itemsFailed: boolean;
}

export const initialState: TIngredientsState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false
};

export const ingredientsReducer = (state = initialState, action: TGetIngredientsActions): TIngredientsState => {
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
                items: action.items,
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