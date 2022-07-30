import { createOrder } from '../../utils/burger-api';
import { TResponseOrder, AppDispatch } from '../../utils/types';

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';
export const CREATE_ORDER_CLEAR: 'CREATE_ORDER_CLEAR' = 'CREATE_ORDER_CLEAR';


export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly details: TResponseOrder;
}

export interface ICreateOrderErrorAction {
    readonly type: typeof CREATE_ORDER_ERROR;
}

export interface ICreateOrderClearAction {
    readonly type: typeof CREATE_ORDER_CLEAR;
}

export type TOrderActions =
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderErrorAction
    | ICreateOrderClearAction;

export function createOrderOnServer(ids: string[], successFunc: () => void) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        createOrder(ids)
            .then((data: TResponseOrder)=> {
                if (data.success) {
                    dispatch({
                        type: CREATE_ORDER_SUCCESS,
                        details: data
                    });

                    if (successFunc) {
                        successFunc();
                    }
                }
                else {
                    dispatch({
                        type: CREATE_ORDER_ERROR
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: CREATE_ORDER_ERROR
                });
            });
    };
}