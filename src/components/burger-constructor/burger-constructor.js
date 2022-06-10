import React, { useCallback } from 'react';
import style from './burger-constructor.module.css';
import ConstructorElementBox from '../constructor-element/constructor-element';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import update from 'immutability-helper'
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { createOrder } from '../../utils/burger-api'
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import {
    ADD_TO_CONSTRUCTOR,
    REMOVE_FROM_CONSTRUCTOR,
    OVERWRITING_CONSTRUCTOR
} from '../../services/actions/burger-constructor';

import {
    CREATE_ORDER_CLEAR
} from '../../services/actions/order-details';

import { createOrderOnServer } from '../../services/actions/order-details';


export default function BurgerConstructor() {
    const { constructorItems } = useSelector(state => state.burgerConstructor);
    const allIngredients = useSelector(state => state.ingredients.items);
    const order = useSelector(state => state.order);

    const [ selectedBun, setSelectedBun ] = React.useState(null);
    const [ selectedToppings, setSelectedToppings ] = React.useState([]);
    const dispatch = useDispatch();

    const getUniqId = () => uuidv4();

    const addToConstuctor = (item) => {
        if (item.type === 'bun' && selectedBun !== undefined) {
            removeFromConstuctor(selectedBun, selectedBun.uuid);
        }

        dispatch({
            type: ADD_TO_CONSTRUCTOR,
            ingredientData: { ...item, uuid: getUniqId() }
        });
    };

    const removeFromConstuctor = (item) => {
        dispatch({
            type: REMOVE_FROM_CONSTRUCTOR,
            ingredientData: { ...item }
        });
    }

    const [, bunDropTarget1] = useDrop({
        accept: "bun",
        drop(itemId) {
            addToConstuctor(itemId.ingredientData);
        },
    });

    const [, bunDropTarget2] = useDrop({
        accept: "bun",
        drop(itemId) {
            addToConstuctor(itemId.ingredientData);
        },
    });

    const [, fillingDropTarget] = useDrop({
        accept: "filling",
        drop(itemId) {
            addToConstuctor(itemId.ingredientData);
        },
    });

    const [orderState, setOrderState] = React.useState({
        "success": false,
        "name": "",
        "order": { "number": null }
    });

    const makeOrder = () => {
        const ids = constructorItems.map(item => item._id);

        dispatch(createOrderOnServer(ids));
    }

    const handleCloseModal = () => {
        console.log(order.orderDetails , '666');
        dispatch({
            type: CREATE_ORDER_CLEAR
        });
    }

    /// Бургера без булки не бывает, по умолчанию что-то должно быть...
    React.useEffect(() => {
        if (selectedBun !== undefined) return;

        let bun = getBun(allIngredients);
        addToConstuctor(bun);
    }, [allIngredients]);

    React.useEffect(() => {
        if (constructorItems === undefined) return;

        let bun = getBun(constructorItems);
        setSelectedBun(bun);

        let toppings = getStuffing();
        setSelectedToppings(toppings);
    }, [constructorItems])

    // Сумма заказа
    const totalSum = React.useMemo(() => {
        if (constructorItems === undefined || !constructorItems) return 0;

        return (
            constructorItems.reduce(
                    (sum, item) =>
                        (item.type == 'bun')
                            ? (sum + item.price * 2)
                            : (sum + item.price)
                    , 0));
    }, [constructorItems]);

    // Получить только булку
    const getBun = (list) => list.find(item => item.type === 'bun');

    // Получить только начинки
    const getStuffing = () => constructorItems.filter(item => item.type !== 'bun');

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: OVERWRITING_CONSTRUCTOR,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
            filling: selectedToppings
        });
    }, []);

    return (
        <>
            <div className={style.burgerConstructorBox}>

                {// Верхняя булочка
                    selectedBun &&
                    <div ref={bunDropTarget1}>
                        <ConstructorElementBox                        
                            type="top"
                            isLocked={true}
                            text={selectedBun.name}
                            price={selectedBun.price}
                            imgUrl={selectedBun.image}
                            />
                    </div>
                }

                <div ref={fillingDropTarget} className={`custom-scroll mb-4 ${style.ingredientList}`}>
                    {
                        selectedToppings.length == 0 &&
                        <div className={style.dragAndDropHint}>
                            Перетащите начинку
                        </div>
                    }

                    {// Начинка
                        selectedToppings
                            .map((item, index) => {

                            return <ConstructorElementBox
                                key={item.uuid}
                                type="middle"
                                isLocked={false}
                                text={item.name}
                                price={item.price}
                                imgUrl={item.image}
                                index={index}
                                handleClose={() => { removeFromConstuctor(item); }}
                                moveCard={moveCard}
                            />
                        })
                    }
                </div>

                {// Нижняя булочка
                    selectedBun &&   
                    <div ref={bunDropTarget2}>
                        <ConstructorElementBox
                            type="bottom"
                            isLocked={true}
                            text={selectedBun.name}
                            price={selectedBun.price}
                            imgUrl={selectedBun.image}
                            />
                    </div>
                }
                {
                    constructorItems !== undefined &&

                    <div className={`pt-10 ${style.runningTitle}`}>
                        <span className="text text_type_digits-medium">{totalSum}</span>

                        <div className="pr-2 pl-2">
                            <CurrencyIcon type="primary" />
                        </div>                       

                        <Button type="primary" size="medium" onClick={makeOrder}>
                                Оформить заказ
                        </Button>                        
                    </div>
                }
            </div>            
            {
                order.orderDetails &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails orderId={order.orderDetails.order.number} />
                </Modal>
            }            
        </>
    );
};