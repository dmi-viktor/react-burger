import React, { FC } from 'react';
import style from './order-row.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CircleImg from '../circle-img/circle-img';
import { TOrder } from '../../utils/types';
import { useSelector } from '../../services/hooks';

import { TIngredient } from '../../utils/types';
import { Link } from 'react-router-dom';
// @ts-ignore
import { useLocation, useRouteMatch } from 'react-router-dom';
import { TLocataionState } from '../../utils/types';

const OrderRow = ({ order }: { order: TOrder }) => {
    const { items } = useSelector(state => state.ingredients);

    const location = useLocation<TLocataionState>();
    const { url } = useRouteMatch();

    const getStrTime = () => {
        let date = new Date(order.updatedAt);
        return ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
    };

    const getIngredient = (id: string) => {
        return items.find((item: TIngredient) => item._id === id);
    };

    const getTotalPriceIngredient = (id: string) => {
        let ingredient = getIngredient(id);
        if (!ingredient) return 0;
        return ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price;
    };

    const maxImages = 6;

    const getStatus = () => {
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
        <Link className={`${style.order} p-6 mb-4`} to={{
            pathname: `${url}/${order.number}`,
            state: { background: location }
        }}>
            <div className={`${style.orderTitle} pb-6`}>
                <span className={`text text_type_main-default ${style.orderNumber}`}>
                    #{order.number}
                </span>
                <span className={`text text_type_main-default text_color_inactive`}>
                    Сегодня, {getStrTime()} i-GMT+3
                </span>
            </div>
            <div className={`${style.description}`}>
                <span className={`pb-2 text text_type_main-medium`}>
                    {order.name}
                </span>
                <span className={`pb-6 text text_type_main-default`} style={getStatusStyle()}>
                    {getStatus()}
                </span>
            </div>
            <div className={`${style.orderDetail}`}>                
                <div className={`${style.miniatures}`}>
                    {
                        order.ingredients &&
                        order.ingredients.slice(0, maxImages - 1).map((data: string, index: number) => (
                            <CircleImg uri={getIngredient(data)?.image_mobile ?? ''} index={maxImages - index} key={index} />
                        ))
                    }

                    {
                        order.ingredients &&
                        (maxImages) <= order.ingredients.length &&
                        <CircleImg uri={getIngredient(order.ingredients[maxImages - 1])?.image_mobile ?? ''} index={0} countHidden={order.ingredients.length - maxImages} key={maxImages} />
                    }
                </div>
                <div className={`${style.price}`}>
                    <span className="text text_type_digits-default pr-1">
                        {
                            order.ingredients &&
                            order.ingredients.reduce(
                                function (previousValue, currentValue)
                                { return previousValue + getTotalPriceIngredient(currentValue) }
                                , 0
                            )
                        }
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
        );
}

export default OrderRow;


