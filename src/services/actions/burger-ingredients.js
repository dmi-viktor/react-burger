import { getIngredients } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR   = 'GET_INGREDIENTS_ERROR';

export function getIngredientsFromServer() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        getIngredients()
            .then(data => {
                if (data.success && 0 < data.data.length) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: data
                    });
                }
                else {
                    dispatch({
                        type: GET_INGREDIENTS_ERROR
                    });
                }
            })
            .catch(e => {
                dispatch({
                    type: GET_INGREDIENTS_ERROR
                });
            });
    };
}