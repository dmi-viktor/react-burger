import React from 'react';
import style from './burger-ingredients.module.css';
import Category from '../category/category';
import Tabs from '../tabs/tabs';
import PropTypes from 'prop-types';

import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';
import { render } from 'react-dom';

export default function BurgerIngredients({ data }) {
    const [state, setState] = React.useState({ data: data });

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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(catalogIngredientType.isRequired).isRequired
};
