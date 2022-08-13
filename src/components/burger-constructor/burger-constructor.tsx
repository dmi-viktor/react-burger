import React, { useCallback } from 'react';
import style from './burger-constructor.module.css';
import ConstructorElementBox from '../constructor-element/constructor-element';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { v4 as uuidv4 } from 'uuid';
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from '../../services/hooks';

import {
    ADD_TO_CONSTRUCTOR,
    REMOVE_FROM_CONSTRUCTOR,
    REMOVE_ALL_FROM_CONSTRUCTOR,
    MOVE_IN_CONSTRUCTOR
} from '../../services/actions/burger-constructor';

import {
    CREATE_ORDER_CLEAR
} from '../../services/actions/order-details';

import { createOrderOnServer } from '../../services/actions/order-details';
import { useHistory } from 'react-router-dom';
import Preloader from '../preloader/preloader';
import { TIngredient, TIngredientUuid } from '../../utils/types';

export default function BurgerConstructor() {
    const { constructorItems } = useSelector(state => state.burgerConstructor);
    const allIngredients = useSelector(state => state.ingredients.items);
    const order = useSelector(state => state.order);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [selectedBun, setSelectedBun] = React.useState<TIngredient | undefined | null>(null);
    const [selectedToppings, setSelectedToppings] = React.useState<TIngredient[]>([]);    

    const getUniqId = () => uuidv4();

    const history = useHistory();    

    const addToConstuctor = (item: TIngredient) => {
        if (item.type === 'bun' && selectedBun) {
            removeFromConstuctor(selectedBun);
        }

        dispatch({
            type: ADD_TO_CONSTRUCTOR,
            ingredientData: { ...item, uuid: getUniqId() }
        });
    };

    const removeFromConstuctor = (item: TIngredient) => {
        dispatch({
            type: REMOVE_FROM_CONSTRUCTOR,
            ingredientData: { ...item }
        });
    }

    const [, bunDropTarget1] = useDrop({
        accept: "bun",
        drop(el: { ingredientData: TIngredient }) {
            addToConstuctor(el.ingredientData);
        },
    });

    const [, bunDropTarget2] = useDrop({
        accept: "bun",
        drop(el: { ingredientData: TIngredient }) {
            addToConstuctor(el.ingredientData);
        },
    });

    const [, fillingDropTarget] = useDrop({
        accept: "filling",
        drop(el: { ingredientData: TIngredient }) {
            addToConstuctor(el.ingredientData);
        },
    });

    const [orderState, setOrderState] = React.useState({
        "success": false,
        "name": "",
        "order": { "number": null }
    });

    const clearConstructor = () => {
        dispatch(
            {
                type: REMOVE_ALL_FROM_CONSTRUCTOR
            }
        );
    }

    const makeOrder = () => {
        if (!auth.isAuth) {
            history.replace({ pathname: '/login' });
        } else {
            const ids: string[] = (constructorItems as TIngredientUuid[]).map((item: TIngredient) => item._id);
            // @ts-ignore
            dispatch(createOrderOnServer(ids, clearConstructor));
        }
    }

    const handleCloseModal = () => {
        dispatch({
            type: CREATE_ORDER_CLEAR
        });
    }

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
            (constructorItems as TIngredientUuid[]).reduce(
                (sum: number, item: TIngredient) =>
                        (item.type == 'bun')
                            ? (sum + item.price * 2)
                            : (sum + item.price)
                    , 0));
    }, [constructorItems]);

    // Получить только булку
    const getBun = (list: TIngredient[]) => list.find((item: TIngredient) => item.type === 'bun');

    // Получить только начинки
    const getStuffing = () => (constructorItems as TIngredientUuid[]).filter((item: TIngredient) => item.type !== 'bun');

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch({
            type: MOVE_IN_CONSTRUCTOR,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        });
    }, []);

    return (
        <>
            <div className={style.burgerConstructorBox}>

                {// Верхняя булочка
                    
                    <div ref={bunDropTarget1} id="ConstructorTopBun">
                        {
                            selectedBun
                            ?
                            <ConstructorElementBox
                                type="top"
                                isLocked={true}
                                text={selectedBun.name}
                                price={selectedBun.price}
                                imgUrl={selectedBun.image}
                            />
                            :
                            <div className={`${style.burgerDragAndDropHint}`}>
                                <span>Перетащите булку</span>
                            </div>
                        }
                    </div>
                }

                <div ref={fillingDropTarget} className={`custom-scroll mb-4 ${style.ingredientList}`} id="ConstructorFilling">
                    {
                        selectedToppings.length == 0 &&
                        <div className={style.dragAndDropHint}>
                            Перетащите начинку
                        </div>
                    }

                    {// Начинка
                        selectedToppings
                            .map((item: TIngredient, index: number) => {

                            return <ConstructorElementBox
                                key={item.uuid}
                                type={undefined}
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
                    <div ref={bunDropTarget2}>
                        {
                            selectedBun
                                ?
                                <ConstructorElementBox
                                    type="bottom"
                                    isLocked={true}
                                    text={selectedBun.name}
                                    price={selectedBun.price}
                                    imgUrl={selectedBun.image}
                                />
                                :
                                <div className={`${style.burgerDragAndDropHint}`}>
                                    <span>Перетащите булку</span>
                                </div>
                        }
                    </div>
                }
                {
                    constructorItems !== undefined &&

                    <div className={`pt-10 ${style.runningTitle}`} data-cy="footer_constructor">
                        <span className="text text_type_digits-medium">{totalSum}</span>

                        <div className="pr-2 pl-2">
                            <CurrencyIcon type="primary" />
                        </div>                       
                        {
                            // @ts-ignore
                            <Button type="primary" size="medium" onClick={makeOrder}>
                                Оформить заказ
                            </Button>
                        }
                    </div>
                }
            </div>            
            {
                order.orderDetails &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal>
            }           
            {
                order.itemsRequest && <Preloader description='У Вас есть время помыть конечности...' />
            }
        </>
    );
};