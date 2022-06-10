import {
    CREATE_ORDER_CLEAR,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED
} from '../actions/order-details';

const initialState = {
    orderDetails: null,
    itemsRequest: false,
    itemsFailed: false
};

export const orderReducer = (state = initialState, action) => {
    console.log('++++++', state, action);

    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            };
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                ...state,
                itemsFailed: false,                
                itemsRequest: false,
                orderDetails: action.details
            };
        }
        case CREATE_ORDER_FAILED: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false
            };
        }
        case CREATE_ORDER_CLEAR: {
            console.log('+++');
            return {
                ...state,
                orderDetails: null
            };
        }
        default: {
            return state;
        }
    }
};