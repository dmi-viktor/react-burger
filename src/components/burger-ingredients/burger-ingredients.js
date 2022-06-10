import React from 'react';
import style from './burger-ingredients.module.css';
import Category from '../category/category';
import Tabs from '../tabs/tabs';

import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

export default function BurgerIngredients() {
    const { items } = useSelector(state => state.ingredients);

    const getFilteredIngredients = (category) => {
        return items.filter(data => data.type == category)
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
