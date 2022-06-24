import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients.js';
import { burgerConstructorReducer } from './burger-constructor.js';
import { ingredientDetailsReducer } from './ingredient-details.js';
import { orderReducer } from './order-details.js';
import { authReducer } from './auth.js';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    auth: authReducer
});