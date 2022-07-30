import { TIngredientUuid } from '../../utils/types';

export const ADD_TO_CONSTRUCTOR: 'ADD_TO_CONSTRUCTOR' = 'ADD_TO_CONSTRUCTOR';
export const REMOVE_FROM_CONSTRUCTOR:     'REMOVE_FROM_CONSTRUCTOR'     = 'REMOVE_FROM_CONSTRUCTOR';
export const REMOVE_ALL_FROM_CONSTRUCTOR: 'REMOVE_ALL_FROM_CONSTRUCTOR' = 'REMOVE_ALL_FROM_CONSTRUCTOR';
export const MOVE_IN_CONSTRUCTOR:         'MOVE_IN_CONSTRUCTOR'         = 'MOVE_IN_CONSTRUCTOR';

export interface IAddToConstructorAction {
    readonly type: typeof ADD_TO_CONSTRUCTOR;
    readonly ingredientData: TIngredientUuid
}

export interface IRemoveToConstructorAction {
    readonly type: typeof REMOVE_FROM_CONSTRUCTOR;
    readonly ingredientData: TIngredientUuid
}

export interface IRemoveAllFromConstructorAction {
    readonly type: typeof REMOVE_ALL_FROM_CONSTRUCTOR;
}

export interface IMoveInConstructorAction {
    readonly type: typeof MOVE_IN_CONSTRUCTOR;
    readonly hoverIndex: number;
    readonly dragIndex: number;
}

export type TConstructorActions =
    | IAddToConstructorAction
    | IRemoveToConstructorAction
    | IRemoveAllFromConstructorAction
    | IMoveInConstructorAction;