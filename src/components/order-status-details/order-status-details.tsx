import React, { FC, useState } from 'react';
import style from './order-status-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CircleImg from '../circle-img/circle-img';
import { useSelector, useDispatch } from '../../services/hooks';

// @ts-ignore
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { TLocataionState } from '../../utils/types';

import { TOrder, TIngredient } from '../../utils/types';

import { getOrderHistoryURL } from '../../utils/burger-api';
import { wsConnect } from '../../services/actions/wsOrderHistoryTypes';

interface IOrderStatusDetails {
    uri: string;
    countHidden?: number;
}

const OrderStatusDetails = ({ data }: { data?: TOrder }) => { //: FC<IOrderStatusDetails>
    const dispatch = useDispatch();

    const orderFeed = useSelector(s => s.orderFeed);
    const orderHistory = useSelector(s => s.orderHistory);
    const { items } = useSelector(state => state.ingredients);

    const { id } = useParams<{ id: string }>();
    const isFeed = !!useRouteMatch({ path: "/feed" })
    const [ingredientGroups, setIngredientGroups] = React.useState<any>(null);    

    const [order, setOrder] = useState<TOrder | null | undefined>(null);

    const getIngredient = (id: string) => {
        if (!items) { return null; }
        return items.find((item: TIngredient) => item._id === id);
    };

    const getOrderFromFeed = (orderId: string) => {
        if (!orderFeed || !orderFeed.data) {
            return null;
        }
        return orderFeed.data.orders.find((item: TOrder) => item.number.toString() === orderId);
    }

    const getOrderFromHistory = (orderId: string) => {
        if (!orderHistory || !orderHistory.data) {
            return null;
        }
        return orderHistory.data.orders.find((item: TOrder) => item.number.toString() === orderId);
    }

    const getStrTime = () => {
        if (!order) return '';

        let date = new Date(order.updatedAt);
        return ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
    };

    React.useEffect(() => {
        let order = isFeed ? getOrderFromFeed(id) : getOrderFromHistory(id);
        setOrder(order);
    }, [orderFeed, orderHistory, id]);

    React.useEffect(() => {
        dispatch(wsConnect(getOrderHistoryURL() as string));
    }, []);



    React.useEffect(() => {

        if (order) {
            let temp = order.ingredients.reduce((group: any, product: string) => {
                group[product] = group[product] ?? [];
                group[product].push(product);
                return group;
            }, {});

            let result = [];
            
            for (var key in temp) {
                let value = temp[key];
                let count = value.length;
                let ingredient = getIngredient(key);
                let unitPrice = ingredient?.price ?? 0;
                let price = ingredient?.type === 'bun' ? unitPrice * 2 : unitPrice;
                let totalPrice = price * count;

                result.push({ ingredient, count, price, totalPrice });
            }

            setIngredientGroups(result);         
        }
    }, [order]);

    const getOrderCost = () => {

        if (!ingredientGroups) return '';

        return ingredientGroups.reduce(
            (sum: number, item: any) =>
                (sum + item.totalPrice)
            , 0);
    };

    const getStatus = () => {
        if (!order) {
            return '';
        }

        switch (order.status) {
            case 'done':
                return 'Выполнен';
            case 'pending':
                return 'Готовится';
            case 'created':
                return 'Создан';
        }
    };

    const getStatusStyle = () => {
        if (!order) {
            return {};
        }

        switch (order.status) {
            case 'done':
                return { color: '#00CCCC' };
            case 'pending':
                return { color: '' };
            case 'created':
                return { color: '' };
        }
    }

    return (
        <>
            {
                order &&
                <div className={style.mainModal}>
                    <div className={`pb-10 text text_type_digits-default`}>
                        #{order.number}
                    </div>
                    <div className={`pb-3 text text_type_main-medium ${style.burgerName}`}>
                        {order.name}
                    </div>
                    <div className={`pb-15 text text_type_main-default ${style.statusOrder}`} style={getStatusStyle()}>
                        {getStatus()}
                    </div>
                    <div className={`pb-6 text text_type_main-medium ${style.headerList}`}>
                        Состав:
                    </div>
                    <div className={`custom-scroll pr-2 pb-10 mb-10 ${style.ingredientList}`}>
                        {
                            ingredientGroups &&
                            ingredientGroups.map((item: any) => (
                                <div className={`pb-4 ${style.ingredient}`} key={item.ingredient._id}>
                                <div className="pr-4">
                                    <CircleImg uri={item.ingredient.image_mobile} />
                                </div>

                                <div className={`pr-4 text text_type_main-default ${style.ingredientName}`}>
                                    { item.ingredient.name }
                                </div>

                                <div className={`${style.price}`}>
                                        <span className="text text_type_digits-default pr-1">
                                            {item.count} x { item.price }
                                    </span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                            )
                            )
                        }
                    </div>
                    <div className={`${style.footer}`}>
                        <div className={`text text_type_main-default text_color_inactive ${style.date}`}>
                            Сегодня, {getStrTime()} i-GMT+3
                        </div>
                        <div className={`${style.price}`}>
                            <span className="text text_type_digits-default pr-1">
                                {getOrderCost()}
                                </span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default OrderStatusDetails;