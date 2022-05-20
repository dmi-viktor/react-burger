import React from 'react';
import style from './burger-constructor.module.css';
import ConstructorElementBox from '../constructor-element/constructor-element';
import Data from '../../utils/data';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const totalSum = (data) => {
    let summ = 0;

    data.map((item, index) => {
        summ += item.price;
    });

    return summ;
};

export default function BurgerConstructor() {
    const [state, setState] = React.useState({ data: Data });

    return (
        <div className={style.burgerConstructorBox}>
            <div className={`custom-scroll ${style.ingredientList}`}>
                {
                    state.data.map((item, index) => {
                        const type = index == 0 ? "top" : index == state.data.length - 1 ? "bottom" : "middle";
                        return <ConstructorElementBox
                            key={item._id}
                            type={type}
                            isLocked={false}
                            text={item.name}
                            price={item.price}
                            imgUrl={item.image}
                        />
                    })
                }
            </div>
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