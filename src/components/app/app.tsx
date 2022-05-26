import React from 'react';
import style from './app.module.css';
import { render } from 'react-dom';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

export default function App() {
    const url = "https://norma.nomoreparties.space/api/ingredients";

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        result:
            {
                success: false,
                data: []
            }
    })

    React.useEffect(() => {

        const getIngredients = async () => {
            setState({ ...state, hasError: false, isLoading: true });

            await fetch(url)
                .then(res => res.json())
                .then(data => setState({ ...state, result: data, isLoading: false }))
                .catch(e => {
                    setState({ ...state, hasError: true, isLoading: false });
                });
        }

        getIngredients();
    }, [])

    return (
        <>
            <div className={style.app}>
                <AppHeader />
                {state.isLoading && 'Загрузка...'}
                {state.hasError && 'Произошла ошибка'}
                {
                    !state.isLoading &&
                    !state.hasError &&
                    state.result.data.length &&
                    state.result.success &&
                
                    <div className={style.mainContentBox}>
                        <span className={`text text_type_main-medium pt-10 pb-6 ${style.title}`}>Соберите бургер</span>
                        <div className={style.content}>
                            <BurgerIngredients data={state.result.data} />
                            <BurgerConstructor data={state.result.data} />
                        </div>
                    </div>                
                }
            </div>            
        </>
    );
}