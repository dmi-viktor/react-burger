import React from 'react';
import style from './ingredient-details.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';

export default function IngredientDetails({ data, onClose}) {
    return (
        <Modal onClose={onClose}>
            <div className={style.mainModal}>
                <div className={style.modalTitle}>
                    <span className="text text_type_main-large"> Детали ингредиента </span>
                </div>
                <div className={style.modalContent}>
                    <img src={data.image_large} className="pb-4" />
                    <span className="text text_type_main-medium pb-8">
                        {data.name}
                    </span>
                    <div className={`${style.energyValueList} pb-5`}>
                        <div className={`${style.energyValue} pr-5`}>
                            <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                            <span className="text text_type_main-default text_color_inactive">{data.calories}</span>
                        </div>
                        <div className={`${style.energyValue} pr-5`}>
                            <span className="text text_type_main-default text_color_inactive">Белки,г</span>
                            <span className="text text_type_main-default text_color_inactive">{data.proteins}</span>
                        </div>
                        <div className={`${style.energyValue} pr-5`}>
                            <span className="text text_type_main-default text_color_inactive">Жиры,г</span>
                            <span className="text text_type_main-default text_color_inactive">{data.fat}</span>
                        </div>
                        <div className={style.energyValue}>
                            <span className="text text_type_main-default text_color_inactive">Углеводы,г</span>
                            <span className="text text_type_main-default text_color_inactive">{data.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        );
}

IngredientDetails.propTypes = {
    data: catalogIngredientType.isRequired,
    onClose: PropTypes.func.isRequired
};