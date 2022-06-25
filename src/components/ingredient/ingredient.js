import React from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import { Link, useLocation } from 'react-router-dom';
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import {
    SHOW_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS    
} from '../../services/actions/ingredient-details';

export default function Ingredient({ ingredientData }) {
    const location = useLocation();
    const { constructorItems } = useSelector(state => state.burgerConstructor);
    const [ ingredientCount, setIngredientCount ] = React.useState(0);

    //const { details } = useSelector(state => state.ingredientDetails);
    const dispatch = useDispatch();

    const [, dragRef] = useDrag({
        type: ingredientData.type == 'bun' ? 'bun' : 'filling',
        item: { ingredientData }
    });

    const handleOpenModal = () => {
        dispatch({
            type: SHOW_INGREDIENT_DETAILS,
            details: ingredientData
        });
    }

    React.useEffect(() => {
        var res = constructorItems
            .filter(item => item._id === ingredientData._id)
            .reduce(
                (count, item) =>
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
            }}>
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

Ingredient.propTypes = {
    ingredientData: catalogIngredientType.isRequired
};