import React from 'react';
import style from './burger-constructor.module.css';
import ConstructorElementBox from '../constructor-element/constructor-element';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { IngredientsInConstructorContext } from '../../services/ingredients-context.js';
import { createOrder } from '../../utils/burger-api'
import { v4 as uuidv4 } from 'uuid';

export default function BurgerConstructor() {
    const { ingredientsInConstructor, setIngredientsInConstructor } = React.useContext(IngredientsInConstructorContext);

    const [orderModalState, setOrderModalState] = React.useState({ isVisible: false });
    const [ selectedBun, setSelectedBun ] = React.useState(null);
    const [ selectedToppings, setSelectedToppings ] = React.useState([]);

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

    React.useEffect(() => {
        let bun = getBun();
        setSelectedBun(bun);

        let toppings = getStuffing();
        setSelectedToppings(toppings);
    }, [ingredientsInConstructor])

    // Сумма заказа
    const totalSum = React.useMemo(() => {
        ingredientsInConstructor.reduce(
            (sum, item) =>
                (item.type == 'bun')
                    ? (sum + item.price * 2)
                    : (sum + item.price)
            , 0);
    }, [ingredientsInConstructor]);

    // Получить только булку
    const getBun = () => ingredientsInConstructor.find(item => item.type === 'bun');

    // Получить только начинки
    const getStuffing = () => ingredientsInConstructor.filter(item => item.type !== 'bun');

    const getUniqId = () => uuidv4();

    return (
        <>
            <div className={style.burgerConstructorBox}>

                {// Верхняя булочка
                    selectedBun &&
                    <ConstructorElementBox
                        type="top"
                        isLocked={true}
                        text={selectedBun.name}
                        price={selectedBun.price}
                        imgUrl={selectedBun.image}
                    />
                }

                <div className={`custom-scroll mb-4 ${style.ingredientList}`}>
                    {// Начинка
                        selectedToppings
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
                    selectedBun &&                    
                    <ConstructorElementBox
                        type="bottom"
                        isLocked={true}
                        text={selectedBun.name}
                        price={selectedBun.price}
                        imgUrl={selectedBun.image}
                    />
                }

                <div className={`pt-10 ${style.runningTitle}`}>
                    <span className="text text_type_digits-medium">{totalSum}</span>

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
                    <OrderDetails orderId={orderState.order.number} />
                </Modal>
            }            
        </>
    );
};