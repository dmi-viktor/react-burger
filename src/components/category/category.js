import React from 'react';
import style from './category.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';

export default function Category({ code, title, list }) {
    return (
        <div id={code} className={style.categoryBox}>
            <span className="text text_type_main-medium pt-6">{title}</span>
            <div className={style.ingredientList}>
                {
                    list.map((data, index) => (
                        <Ingredient data={data} key={data._id} />
                    ))
                }
            </div>
        </div>
    )
}

const messagePropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
});

Category.propTypes = {
    list: PropTypes.arrayOf(messagePropTypes.isRequired).isRequired
};