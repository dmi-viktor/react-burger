import { createOrder } from '../../utils/burger-api';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const CREATE_ORDER_CLEAR = 'CREATE_ORDER_CLEAR';

export function createOrderOnServer(ids) {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        createOrder(ids)
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: CREATE_ORDER_SUCCESS,
                        details: data
                    });
                }
                else {
                    dispatch({
                        type: CREATE_ORDER_FAILED
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: CREATE_ORDER_FAILED
                });
            });
    };
}