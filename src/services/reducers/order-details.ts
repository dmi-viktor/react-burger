import { TOrder, TResponseOrder } from '../../utils/types';

import {
    CREATE_ORDER_CLEAR,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    TOrderActions
} from '../actions/order-details';


type TOrderState = {
    orderDetails: TResponseOrder | null,
    itemsRequest: boolean,
    itemsFailed: boolean
}

export const initialState: TOrderState = {
    orderDetails: null,
    itemsRequest: false,
    itemsFailed: false
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
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
        case CREATE_ORDER_ERROR: {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false
            };
        }
        case CREATE_ORDER_CLEAR: {
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