import React from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useLocation } from 'react-router-dom';
import { useDrag } from "react-dnd";
import { useSelector } from '../../services/hooks';
import { TIngredient, TLocataionState, TIngredientUuid } from '../../utils/types';

export default function Ingredient({ ingredientData }: { ingredientData: TIngredient }) {
    const location = useLocation<TLocataionState>();
    const { constructorItems } = useSelector(state => state.burgerConstructor);
    const [ ingredientCount, setIngredientCount ] = React.useState<number>(0);

    const [, dragRef] = useDrag<{ ingredientData: TIngredient }>({
        type: ingredientData.type == 'bun' ? 'bun' : 'filling',
        item: { ingredientData }
    });

    React.useEffect(() => {
        var res = (constructorItems as TIngredientUuid[])
            .filter((item: TIngredient) => item._id === ingredientData._id)
            .reduce(
                (count: number, item: TIngredient) =>
                    (item.type == 'bun')
                        ? (count + 2)
                        : (count + 1)
                , 0);
        setIngredientCount(res);
    }, [constructorItems]);    

    return (
        <>
            <Link ref={dragRef} className={style.productBox + " mt-6 ml-4 mr-4"} to={{
                pathname: `/ingredients/${ingredientData._id}`,
                state: { background: location }                
            }} data-cy={`ingredient_${ingredientData._id}`} data-type={ingredientData.type == 'bun' ? 'bun' : 'filling'}>
                <img className="pl-4 pr-4 pb-1" src={ingredientData.image} />
                <div className={style.priceBox} >
                    <span className="text text_type_digits-default pr-1">{ingredientData.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className="text text_type_main-default pt-1">
                    {ingredientData.name}
                </span>
                {
                    ingredientCount !== 0 &&
                    <Counter count={ingredientCount} size="default" />
                }
            </Link>
        </>
    );
}