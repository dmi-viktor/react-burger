import React from 'react';
import style from './app.module.css';
import { render } from 'react-dom';
import data from '../../utils/data';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'


declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

export default function App() {
    return (
        <div className={style.app}>
            <AppHeader />
            <div className={style.mainContentBox}>
                <span className={`text text_type_main-medium pt-10 pb-6 ${style.title}`}>Соберите бургер</span>
                <div className={style.content}>
                    <BurgerIngredients data={data} />
                    <BurgerConstructor data={data} />
                </div>
            </div>
        </div>
    );
}