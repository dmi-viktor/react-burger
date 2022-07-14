import React, { LegacyRef } from 'react';
import style from './category.module.css';
import Ingredient from '../ingredient/ingredient';

import { TIngredient } from '../../utils/types';

interface ICategory {
    code: string;
    title: string;
    list: TIngredient[];
    reference: LegacyRef<HTMLDivElement>;
}

export default function Category({ code, title, list, reference }: ICategory) {
    return (
        <div id={code} className={style.categoryBox} ref={reference}>
            <span className="text text_type_main-medium pt-6">{title}</span>
            <div className={style.ingredientList}>
                {
                    list.map((data: TIngredient, index: number) => (
                        <Ingredient ingredientData={data} key={data._id} />
                    ))
                }
            </div>
        </div>
    )
}