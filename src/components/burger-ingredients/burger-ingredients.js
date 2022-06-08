import React from 'react';
import style from './burger-ingredients.module.css';
import Category from '../category/category';
import Tabs from '../tabs/tabs';

import { IngredientsContext } from '../../services/ingredients-context.js';

export default function BurgerIngredients() {    
    const { ingredients, setIngredients } = React.useContext(IngredientsContext); 

    const getFilteredIngredients = (category) => {
        return ingredients.filter(data => data.type == category)
    }

    return (
        <div className={style.ingredientList}>
            <Tabs />
            <div className={`custom-scroll ${style.categoryList}`}>
                {
                    <>
                        <Category title="Булочка" code="bun" list={getFilteredIngredients('bun')} />
                        <Category title="Соусы" code="sauce" list={getFilteredIngredients('sauce')} />
                        <Category title="Начинки" code="main" list={getFilteredIngredients('main')} />
                    </>
                }
            </div>
        </div>
    );
}
