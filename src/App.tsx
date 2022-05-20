import React from 'react';
import './App.css';
import { render } from 'react-dom';

import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'


declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

export default function App() {
    return (
        <div className="App" style={{
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            top: "0",
            display: "flex",
            flexDirection: "column"
        }}>
            <AppHeader />
            <div style={{ maxWidth: "1280px", marginRight: "auto", marginLeft: "auto", height: "calc(100% - 88px)", display: "flex", flexDirection: "column" }}>
                <span className="text text_type_main-medium pt-10 pb-6" style={{ textAlign: "left" }}>Соберите бургер</span>
                <div style={{ display: "flex", height: "calc(100% - 140px)" }}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </div>
        </div>
    );
}