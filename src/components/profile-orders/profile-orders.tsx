import React, { FC } from 'react';
import style from './profile-orders.module.css';
import { useSelector, useDispatch } from '../../services/hooks';

import OrderRow from '../order-row/order-row';
import { TOrder } from '../../utils/types';

import { getOrderHistoryURL } from '../../utils/burger-api';
import { wsConnect } from '../../services/actions/wsOrderHistoryTypes';

const OrdersHistory: FC = () => {
    const dispatch = useDispatch();
    const orderHistory = useSelector(s => s.orderHistory);

    React.useEffect(() => {
        dispatch(wsConnect(getOrderHistoryURL() as string));
    }, []);

    return (
        <div className={`ml-15 ${style.listOrders}`}>
            <div className={`custom-scroll pr-2 ${style.orderFeed}`}>
                {
                    orderHistory
                    && orderHistory.data
                    && orderHistory.data.orders
                    && orderHistory.data.orders.map((data: TOrder, index: number) => (
                        <OrderRow order={data} key={data.number} />
                        )
                    )
                }                
            </div>
        </div>
        );
}

export default OrdersHistory;