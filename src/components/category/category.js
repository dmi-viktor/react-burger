import React from 'react';
import style from './category.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';

import {catalogIngredientType} from '../../types/catalog-ingredient-type.js';

export default function Category({ code, title, list, reference }) {
    return (
        <div id={code} className={style.categoryBox} ref={reference}>
            <span className="text text_type_main-medium pt-6">{title}</span>
            <div className={style.ingredientList}>
                {
                    list.map((data, index) => (
                        <Ingredient ingredientData={data} key={data._id} />
                    ))
                }
            </div>
        </div>
    )
}

Category.propTypes = {
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(catalogIngredientType.isRequired).isRequired
};