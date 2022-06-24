import {
    SHOW_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS
} from '../actions/ingredient-details';

const initialState = {
    details: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                details: action.details
            };
        }
        case CLOSE_INGREDIENT_DETAILS: {
            return {
                ...state,
                details: null
            };
        }
        default: {
            return state;
        }
    }
};