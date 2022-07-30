import { getIngredients } from '../../utils/burger-api';
import { TIngredient, AppDispatch } from '../../utils/types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR:   'GET_INGREDIENTS_ERROR'   = 'GET_INGREDIENTS_ERROR';

export interface IGetIngredientRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS;
    items: TIngredient[];
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TGetIngredientsActions =
    | IGetIngredientRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsErrorAction;

export function getIngredientsFromServer() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        getIngredients()
            .then(data => {
                if (data.success && 0 < data.data.length) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: data.data
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