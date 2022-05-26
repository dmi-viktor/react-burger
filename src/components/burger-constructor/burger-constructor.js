import React from 'react';
import style from './burger-constructor.module.css';
import ConstructorElementBox from '../constructor-element/constructor-element';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';

import { catalogIngredientType } from '../../types/catalog-ingredient-type.js';
import OrderDetails from '../order-details/order-details';


// Сумма заказа
const totalSum = (constructor) => {
    let summ = 0;

    if (constructor.bun) {
        summ += constructor.bun.price;
    }

    if (constructor.filling && constructor.filling.length) {
        constructor.filling.map((item, index) => {
            summ += item.price;
        });
    }

    return summ;
};

export default function BurgerConstructor({ data }) {
    const [state, setState] = React.useState(
        {
            constructor: {
                bun: null,
                filling: []
            },
            isVisibleModal: false
        });

    // Заполняем конструктор тестовыми данными
    React.useEffect(() => {
        let tempBun = data.find(item => item.type === 'bun'); // Могут ли быть булки разными? И цена за половинку или за обе? Непонятно...
        let tempFilling = data.filter(item => item.type !== 'bun');

        setState({ ...state, constructor: { bun: tempBun, filling: tempFilling } });
    }, [])

    const handleOpenModal = () => {
        setState({ ...state, isVisibleModal: true });
    }

    const handleCloseModal = () => {
        setState({ ...state, isVisibleModal: false });
    }

    return (
        <>
            <div className={style.burgerConstructorBox}>

                {// Верхняя булочка
                    state.constructor.bun &&
                    <ConstructorElementBox
                        type="top"
                        isLocked={true}
                        text={state.constructor.bun.name}
                        price={state.constructor.bun.price}
                        imgUrl={state.constructor.bun.image}
                    />
                }

                <div className={`custom-scroll mb-4 ${style.ingredientList}`}>
                    {// Начинка
                        state.constructor.filling && state.constructor.filling
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

                {// Нижняя булочка
                    state.constructor.bun &&
                    <ConstructorElementBox
                        type="bottom"
                        isLocked={true}
                        text={state.constructor.bun.name}
                        price={state.constructor.bun.price}
                        imgUrl={state.constructor.bun.image}
                    />
                }

                <div className={`pt-10 ${style.runningTitle}`}>
                    <span className="text text_type_digits-medium">{totalSum(state.constructor)}</span>

                    <div className="pr-2 pl-2">
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button type="primary" size="medium" onClick={handleOpenModal}>
                        Оформить заказ
                        </Button>
                </div>
            </div>

            { state.isVisibleModal && <OrderDetails onClose={handleCloseModal} />}
        </>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(catalogIngredientType.isRequired).isRequired
};