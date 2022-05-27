import React from 'react';
import style from './ingredient-value-details.module.css';
import PropTypes from 'prop-types';

export default function IngredientValueDetails({ title, energyValue }) {
    return (
            <div className={style.energyValue}>
                <span className="text text_type_main-default text_color_inactive">{title}</span>
                <span className="text text_type_main-default text_color_inactive">{energyValue}</span>
            </div>
        );
}

IngredientValueDetails.propTypes = {
    title: PropTypes.string.isRequired,
    energyValue: PropTypes.number.isRequired
};