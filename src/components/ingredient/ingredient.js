import React from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';

export default function Ingredient({ data }) {
    return (
        <div className={style.productBox + " mt-6 ml-4 mr-4"}>
            <img className="pl-4 pr-4 pb-1" src={data.image} />
            <div className={style.priceBox}>
                <span className="text text_type_digits-default pr-1">{data.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default pt-1">
                {data.name}
            </span>
            <Counter count={1} size="default" />
        </div>
    );
}

Ingredient.propTypes = {
    data: catalogIngredientType.isRequired
};