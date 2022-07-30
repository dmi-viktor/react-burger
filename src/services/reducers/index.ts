import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order-details';
import { authReducer } from './auth';
import { wsReducer } from './wsOrderFeedReducer';
import { wsOrderHistoryReducer } from './wsOrderHistoryReducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    auth: authReducer,
    orderFeed: wsReducer,
    orderHistory: wsOrderHistoryReducer
});