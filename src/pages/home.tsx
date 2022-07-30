import React, { FC } from 'react';
import style from './home.module.css';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//declare module 'react' {
//    interface FunctionComponent<}> {
//        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
//    }
//}

const HomePage: FC = () => {
    return (             
        <>        
            <span className={`text text_type_main-medium pt-10 pb-6 ${style.title}`}>Соберите бургер</span>
            <div className={style.content}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </div>
        </>
    );
}

export default HomePage;