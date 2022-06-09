import React from 'react';
import style from './burger-ingredients.module.css';
import Category from '../category/category';
import Tabs from '../tabs/tabs';

import { IngredientsContext } from '../../services/ingredients-context.js';
import { useInView } from 'react-intersection-observer';

export default function BurgerIngredients() {    
    const { ingredients, setIngredients } = React.useContext(IngredientsContext); 

    const getFilteredIngredients = (category) => {
        return ingredients.filter(data => data.type == category)
    }

    const [ bunRef, inViewBun ] = useInView({
        threshold: 0.2,
    });

    const [ sauceRef, inViewSauce ] = useInView({
        threshold: 0.2,
    });

    const [ mainRef, inViewMain ] = useInView({
        threshold: 0.2,
    });

    return (
        <div className={style.ingredientList}>
            <Tabs inViewBun={inViewBun} inViewSauce={inViewSauce} inViewMain={inViewMain}/>
            <div className={`custom-scroll ${style.categoryList}`}>
                <Category reference={bunRef} title="Булочка" code="bun" list={getFilteredIngredients('bun')} />
                <Category reference={sauceRef} title="Соусы" code="sauce" list={getFilteredIngredients('sauce')} />
                <Category reference={mainRef} title="Начинки" code="main" list={getFilteredIngredients('main')} />
            </div>
        </div>
    );
}
