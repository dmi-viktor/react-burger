import React from 'react';
import style from './burger-ingredients.module.css';
import Category from '../category/category';
import Tabs from '../tabs/tabs';

import { useInView } from 'react-intersection-observer';
 // @ts-ignore
import { useSelector } from 'react-redux';
import { TIngredient } from '../../utils/types';

export default function BurgerIngredients() {
    // @ts-ignore
    const { items, itemsRequest, itemsFailed } = useSelector(state => state.ingredients);

    const getFilteredIngredients = (category: string) => {
        return items.filter((data: TIngredient) => data.type == category)
    }

    const [ bunRef, inViewBun ] = useInView({
        threshold: 0.2,
    });

    const [ sauceRef, inViewSauce ] = useInView({
        threshold: 0.2,
    });

    const [ mainRef, inViewMain ] = useInView({
        threshold: 0.2,
    });

    return (    
        <div className={style.ingredientList}>
            <Tabs inViewBun={inViewBun} inViewSauce={inViewSauce} inViewMain={inViewMain} />
            {itemsRequest && 'Загрузка...'}
            {itemsFailed && 'Произошла ошибка'}
            {
                !itemsRequest &&
                !itemsFailed &&
                <>                
                    <div className={`custom-scroll ${style.categoryList}`}>
                        <Category reference={bunRef} title="Булочка" code="bun" list={getFilteredIngredients('bun')} />
                        <Category reference={sauceRef} title="Соусы" code="sauce" list={getFilteredIngredients('sauce')} />
                        <Category reference={mainRef} title="Начинки" code="main" list={getFilteredIngredients('main')} />
                    </div>
                </>
            }
        </div>
    );
}
