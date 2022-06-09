import React from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import { getIngredients } from '../../utils/burger-api'

import { IngredientsContext, IngredientsInConstructorContext } from '../../services/ingredients-context.js';

//declare module 'react' {
//    interface FunctionComponent<}> {
//        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
//    }
//}

export default function App() {
    const [loadingState, setLoadingState] = React.useState({
        isLoading: false,
        hasError: false,
    });

    const [ingredients, setIngredients] = React.useState([]);
    const [ingredientsInConstructor, setIngredientsInConstructor] = React.useState([]);

    React.useEffect(() => {
        setLoadingState({ ...loadingState, hasError: false, isLoading: true });
        
        getIngredients()
            .then(data =>
            {
                if (data.success && 0 < data.data.length) {
                    setLoadingState({ ...loadingState, isLoading: false });
                    setIngredients(data.data);

                    // For debug
                    // Добавим ингридиенты                    
                    let temp = data.data.filter(item => item.type !== 'bun');
                    
                    // Добавим булку
                    const bun = data.data.find(item => item.type === 'bun');
                    temp.push(bun);

                    setIngredientsInConstructor(temp);
                }
                else {
                    setLoadingState({ ...loadingState, hasError: true, isLoading: false });
                }
            })
            .catch(e => {
                setLoadingState({ ...loadingState, hasError: true, isLoading: false });
            });
    }, [])

    return (
        <>
            <div className={style.app}>
                <AppHeader />
                {loadingState.isLoading && 'Загрузка...'}
                {loadingState.hasError && 'Произошла ошибка'}
                {
                    !loadingState.isLoading &&
                    !loadingState.hasError &&
                
                    <div className={style.mainContentBox}>
                        <span className={`text text_type_main-medium pt-10 pb-6 ${style.title}`}>Соберите бургер</span>
                        <div className={style.content}>
                            <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
                                <IngredientsInConstructorContext.Provider value={{ ingredientsInConstructor, setIngredientsInConstructor }}>
                                    <BurgerIngredients />
                                    <BurgerConstructor />
                                </IngredientsInConstructorContext.Provider>
                            </IngredientsContext.Provider>
                        </div>
                    </div>                
                }
            </div>            
        </>
    );
}