import React from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import { useSelector, useDispatch } from 'react-redux';
import { getIngredientsFromServer } from '../../services/actions/burger-ingredients';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//declare module 'react' {
//    interface FunctionComponent<}> {
//        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
//    }
//}

export default function App() {
    const { items, itemsRequest, itemsFailed } = useSelector(state => state.ingredients);

    const dispatch = useDispatch();

    // Инициализируем получение ингредиентов с сервера
    React.useEffect(() => {
        dispatch(getIngredientsFromServer());
    }, [])

    return (
        <>
            <div className={style.app}>
                <AppHeader />
                {itemsRequest && 'Загрузка...'}
                {itemsFailed && 'Произошла ошибка'}
                {
                    !itemsRequest &&
                    !itemsFailed &&
                
                    <div className={style.mainContentBox}>
                        <span className={`text text_type_main-medium pt-10 pb-6 ${style.title}`}>Соберите бургер</span>
                        <div className={style.content}>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </DndProvider>
                        </div>
                    </div>                
                }
            </div>            
        </>
    );
}