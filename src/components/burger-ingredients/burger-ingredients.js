import React from 'react';
import style from './burger-ingredients.module.css';
import Category from '../category/category';
import Tabs from '../tabs/tabs';
import PropTypes from 'prop-types';

import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';

export default function BurgerIngredients({ allIngredients }) {
    const [ingredients, setIngredients] = React.useState( allIngredients );

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

BurgerIngredients.propTypes = {
    allIngredients: PropTypes.arrayOf(catalogIngredientType.isRequired).isRequired
};
