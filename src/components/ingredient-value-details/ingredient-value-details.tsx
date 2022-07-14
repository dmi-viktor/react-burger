import React from 'react';
import style from './ingredient-value-details.module.css';

export default function IngredientValueDetails({ title, energyValue }: { title: string; energyValue: number; }) {
    return (
            <div className={style.energyValue}>
                <span className="text text_type_main-default text_color_inactive">{title}</span>
                <span className="text text_type_main-default text_color_inactive">{energyValue}</span>
            </div>
        );
}