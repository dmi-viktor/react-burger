import React from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';
import Modal from '../modal/modal';

export default function Ingredient({ data }) {
    const [isVisibleModal, setVisibleModal] = React.useState( false );

    function handleOpenModal() {
        setVisibleModal(true);
    }

    const handleCloseModal = () => {
        setVisibleModal(false);
    }

    const modal = (
        <Modal onClose={handleCloseModal}>
            <div className={style.MainModal}>
                <div className={style.ModalTitle}>
                    <span className="text text_type_main-large"> Детали ингредиента </span>
                </div>
                <div className={style.ModalContent}>
                    <img src={data.image_large} className="pb-4" />
                    <span className="text text_type_main-medium pb-8">
                        {data.name}
                    </span>
                    <div className={`${style.EnergyValueList} pb-5`}>
                        <div className={`${style.EnergyValue} pr-5`}>
                            <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                            <span className="text text_type_main-default text_color_inactive">{ data.calories }</span>
                        </div>
                        <div className={`${style.EnergyValue} pr-5`}>
                            <span className="text text_type_main-default text_color_inactive">Белки,г</span>
                            <span className="text text_type_main-default text_color_inactive">{ data.proteins }</span>
                        </div>
                        <div className={`${style.EnergyValue} pr-5`}>
                            <span className="text text_type_main-default text_color_inactive">Жиры,г</span>
                            <span className="text text_type_main-default text_color_inactive">{ data.fat }</span>
                        </div>
                        <div className={style.EnergyValue}>
                            <span className="text text_type_main-default text_color_inactive">Углеводы,г</span>
                            <span className="text text_type_main-default text_color_inactive">{ data.carbohydrates }</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );

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
            { isVisibleModal && modal}
        </>
    );
}

Ingredient.propTypes = {
    data: catalogIngredientType.isRequired
};