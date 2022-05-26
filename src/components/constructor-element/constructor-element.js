import React from 'react';
import style from './constructor-element.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function ConstructorElementBox({ type, isLocked, text, price, imgUrl }) {
    return (
        <div className={`pb-4 ${type} ${style.constructorElementBox}`}>
            <div className={`pr-2 ${isLocked && style.dragIcon}`}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={`${text} ${type === "top" ? "(верх)" : type === "bottom" ? "(низ)" : ""}`}
                price={price}
                thumbnail={imgUrl}
            />
        </div>
    );
}

ConstructorElementBox.propTypes = {
    type: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    text: PropTypes.string,
    price: PropTypes.number.isRequired,
    imgUrl: PropTypes.string,
};


