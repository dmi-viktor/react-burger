import React from 'react';

import style from './ingredient-details.module.css';

import IngredientDetails from '../components/ingredient-details/ingredient-details.js';

export function IngredientDetailsPage() {
    return (
        <div className={`${style.wrapper} p-10`}>
            <IngredientDetails/>
        </div>
    );
}