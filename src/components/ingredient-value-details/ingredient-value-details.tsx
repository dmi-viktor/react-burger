import React from 'react';
import style from './ingredient-value-details.module.css';

export default function IngredientValueDetails({ title, energyValue, dataCy }: { title: string; energyValue: number; dataCy: string }) {
    return (
            <div className={style.energyValue} data-cy={dataCy}>
                <span className="text text_type_main-default text_color_inactive">{title}</span>
                <span className="text text_type_main-default text_color_inactive" data-cy="detail-value">{energyValue}</span>
            </div>
        );
}