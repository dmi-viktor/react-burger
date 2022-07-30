import React, { FC } from 'react';

import style from './ingredient-details.module.css';

import IngredientDetails from '../components/ingredient-details/ingredient-details';

const IngredientDetailsPage: FC = () => {
    return (
        <div className={`${style.wrapper} p-10`}>
            <IngredientDetails/>
        </div>
    );
}

export default IngredientDetailsPage;