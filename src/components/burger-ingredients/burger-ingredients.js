import React from 'react';
import style from './burger-ingredients.module.css';
import Category from '../category/category';
import Tabs from '../tabs/tabs';
import Data from '../../utils/data'


import { render } from 'react-dom';

export default function IngredientList() {
    const [state, setState] = React.useState({ data: Data });

    return (
        <div className={style.ingredientList}>
            <Tabs />
            <div className={`custom-scroll ${style.categoryList}`}>
                {
                    <>
                        <Category title="Булочка" code="bun" list={state.data.filter(data => data.type == 'bun')} />
                        <Category title="Соусы" code="sauce" list={state.data.filter(data => data.type == 'sauce')} />
                        <Category title="Начинки" code="main" list={state.data.filter(data => data.type == 'main')} />
                    </>
                }
            </div>
        </div>
    );
}
