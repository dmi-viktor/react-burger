
import { ThunkAction } from 'redux-thunk';
import { Dispatch, Action, ActionCreator } from 'redux';
import { TAuthActions } from '../services/actions/auth';
import { TConstructorActions } from '../services/actions/burger-constructor';
import { TGetIngredientsActions } from '../services/actions/burger-ingredients';
import { TOrderActions } from '../services/actions/order-details';
import { store } from '../services/store';

export type TIngredient = {
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly proteins: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly type: string;
    readonly __v: number;
    readonly _id: string;
    readonly uuid?: string | null;
};

export type TIngredientUuid = TIngredient & { uuid: string };

export type TLocataionState = {
    readonly background: Location;
};



/*Для ленты заказов*/

export type TOrder = {
    readonly ingredients: string[];
    readonly _id: string;
    readonly status: string;
    readonly number: number;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export type TOrders ={
    readonly success: boolean;
    readonly orders: TOrder[];
    readonly total: number;
    readonly totalToday: number;
}

/*Для ленты заказов*/


/*Api types*/
export type TSuccess = { readonly success: boolean };

export type TIngredientsData = TSuccess & {
    readonly data: readonly TIngredient[]
}

export type TResponseOrder = TSuccess & {
    readonly name: string,
    readonly order: {
        readonly number: number
    }
}

export type TPasswordRecovery = TSuccess & {
    readonly message: string
};

export type TError = TPasswordRecovery;

export type TSuccessfulLogout = TPasswordRecovery;

export type TSuccessfulTokenRefresh = TSuccess & {
    readonly accessToken: string,
    readonly refreshToken: string
}

export type TSuccessfulProfile = TPasswordRecovery & {
    readonly user: {
        readonly email: string,
        readonly name: string
    }
}

export type TSuccessfulRegistration = TSuccessfulProfile & TSuccessfulTokenRefresh;

export type TSuccessfulAuthorization = TSuccessfulRegistration;

/*Api types*/

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
    | TAuthActions
    | TConstructorActions
    | TGetIngredientsActions
    | TOrderActions;


export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
    >

export type AppDispatch = typeof store.dispatch

//export type AppDispatch<TReturnType = void> = (action: TApplicationActions | AppThunk) => TReturnType;
