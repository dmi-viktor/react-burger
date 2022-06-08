import React from 'react';
import style from './burger-constructor.module.css';
import ConstructorElementBox from '../constructor-element/constructor-element';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { IngredientsInConstructorContext } from '../../services/ingredients-context.js';
import { OrderContext } from '../../services/order-context.js';
import { createOrder } from '../../utils/burger-api'
import { v4 as uuidv4 } from 'uuid';

export default function BurgerConstructor() {
    const [orderModalState, setOrderModalState] = React.useState({ isVisible: false });
    const { ingredientsInConstructor, setIngredientsInConstructor } = React.useContext(IngredientsInConstructorContext);
    const [orderState, setOrderState] = React.useState({
        "success": false,
        "name": "",
        "order": { "number": null }
    });
    const [loadingState, setLoadingState] = React.useState({
        isLoading: false,
        hasError: false,
    });

    const makeOrder = () => {
        setLoadingState({ ...loadingState, hasError: false, isLoading: true });

        const ids = ingredientsInConstructor.map(item => item._id); // булку без повтора согласно задания? 

        createOrder(ids)
            .then(data => {
                setLoadingState({ ...loadingState, isLoading: false });

                setOrderState(data);

                if (data.success) {
                    handleOpenModal();
                }
            })
            .catch(e => {
                setLoadingState({ ...loadingState, hasError: true, isLoading: false });
            });
    }

    const handleOpenModal = () => {
        setOrderModalState({ ...orderModalState, isVisible: true });
    }

    const handleCloseModal = () => {
        setOrderModalState({ ...orderModalState, isVisible: false });
    }

    // Сумма заказа
    const totalSum = () => {
        return ingredientsInConstructor.reduce(
            (sum, item) =>
                (item.type == 'bun')
                    ? (sum + item.price * 2)
                    : (sum + item.price)
            , 0);
    };

    // С точки зрения алгоритмической сложности это не красивое решение
    // Был бы рад совету. Можно при помощи useEffect в state записать и ограничить изменением ingredients, но не будет ли это награмождением?
    const getBun = () => ingredientsInConstructor.find(item => item.type === 'bun');

    const getStuffing = () => ingredientsInConstructor.filter(item => item.type !== 'bun');

    const getUniqId = () => uuidv4();

    return (
        <>
            <div className={style.burgerConstructorBox}>

                {// Верхняя булочка
                    getBun() &&
                    <ConstructorElementBox
                        type="top"
                        isLocked={true}
                        text={getBun().name}
                        price={getBun().price}
                        imgUrl={getBun().image}
                    />
                }

                <div className={`custom-scroll mb-4 ${style.ingredientList}`}>
                    {// Начинка
                        getStuffing()
                            .map((item, index) => {

                            return <ConstructorElementBox
                                key={getUniqId()}
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
                    getBun() &&                    
                    <ConstructorElementBox
                        type="bottom"
                        isLocked={true}
                        text={getBun().name}
                        price={getBun().price}
                        imgUrl={getBun().image}
                    />
                }

                <div className={`pt-10 ${style.runningTitle}`}>
                    <span className="text text_type_digits-medium">{totalSum()}</span>

                    <div className="pr-2 pl-2">
                        <CurrencyIcon type="primary" />
                    </div>

                    <Button type="primary" size="medium" onClick={makeOrder}>
                        Оформить заказ
                        </Button>
                </div>
            </div>

            
            {
                orderModalState.isVisible &&
                <Modal onClose={handleCloseModal}>
                    <OrderContext.Provider value={{ orderState, setOrderState }}>
                        <OrderDetails />
                    </OrderContext.Provider>
                </Modal>
            }            
        </>
    );
};