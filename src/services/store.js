import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from 'redux-thunk'

import { rootReducer } from './reducers/index';
import { getIngredientsFromServer } from './actions/burger-ingredients';

const log =
    () =>
        (store) =>
            (next) =>
                (action) => {
                    return next(action);
                };

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));  // log(), 

export const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );
    return store;
};