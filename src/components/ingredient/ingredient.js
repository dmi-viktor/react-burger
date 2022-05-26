import React from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function Ingredient({ data }) {
    const [isVisibleModal, setVisibleModal] = React.useState( false );

    const handleOpenModal = () => {
        setVisibleModal(true);
    }

    const handleCloseModal = () => {
        setVisibleModal(false);
    }

    return (
        <>
            <button className={style.productBox + " mt-6 ml-4 mr-4"} onClick={handleOpenModal}>
                <img className="pl-4 pr-4 pb-1" src={data.image} />
                <div className={style.priceBox} >
                    <span className="text text_type_digits-default pr-1">{data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className="text text_type_main-default pt-1">
                    {data.name}
                </span>
                <Counter count={1} size="default" />
            </button>
            { isVisibleModal && <IngredientDetails data={data} onClose={handleCloseModal} />}
        </>
    );
}

Ingredient.propTypes = {
    data: catalogIngredientType.isRequired
};