import React from 'react';
import style from './burger-constructor.module.css';
import ConstructorElementBox from '../constructor-element/constructor-element';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';

import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';

/// Здесь исключительно тестовые данные и дальнейшая структора пока непонятна. Поэтому позволил себе хард код.

const totalSum = (data) => {
    let summ = 0;

    data.map((item, index) => {
        summ += item.price;
    });

    return summ;
};

export default function BurgerConstructor({ data }) {
    const [state, setState] = React.useState({ data: data });

    return (
        <div className={style.burgerConstructorBox}>            
            <ConstructorElementBox
                type="top"
                isLocked={true}
                text="Краторная булка N-200i"
                price={1255}
                imgUrl="https://code.s3.yandex.net/react/code/bun-02.png"
            />
            <div className={`custom-scroll mb-4 ${style.ingredientList}`}>
                {
                    state.data
                        .filter(item => item.type !== 'bun')
                        .map((item, index) => {

                        return <ConstructorElementBox
                            key={index}
                            type="middle"
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            imgUrl={item.image}
                        />
                    })
                }
            </div>
            <ConstructorElementBox
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i"
                price={1255}
                imgUrl="https://code.s3.yandex.net/react/code/bun-02.png"
            />
            <div className={`pt-10 ${style.runningTitle}`}>
                <span className="text text_type_digits-medium">{totalSum(state.data)}</span>

                <div className="pr-2 pl-2">
                    <CurrencyIcon type="primary" />
                </div>

                <Button type="primary" size="medium">
                    Оформить заказ
                    </Button>
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(catalogIngredientType.isRequired).isRequired
};