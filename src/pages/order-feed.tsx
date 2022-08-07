import React, { FC } from 'react';
import style from './order-feed.module.css';
import OrderRow from '../components/order-row/order-row';
import {TOrder} from '../utils/types';
import { useSelector, useDispatch } from '../services/hooks';

import { ORDER_FEED_URL } from '../utils/burger-api';
import { wsConnect, wsClose } from '../services/actions/wsOrderFeedTypes';

const OrderFeedPage: FC = () => {
    const dispatch = useDispatch();
    const orderFeed = useSelector(s => s.orderFeed);
    const [ordersInPending, setOrdersInPending] = React.useState<TOrder[]>([]);
    const [ordersInDone, setOrdersInDone] = React.useState<TOrder[]>([]);

    React.useEffect(() => {
        if (orderFeed && orderFeed.data && orderFeed.data.orders) {
            let temp = orderFeed.data.orders.filter((item: TOrder) => item.status === 'done');
            setOrdersInDone(temp.slice(0, 10));

            temp = orderFeed.data.orders.filter((item: TOrder) => item.status === 'pending');
            setOrdersInPending(temp.slice(0, 10));
        }
    }, [orderFeed]);

    React.useEffect(() => {
        dispatch(wsConnect(ORDER_FEED_URL));

        return () => {
            dispatch(wsClose())
        }
    }, []);

    return (             
        <>        
            <span className={`text text_type_main-large pt-10 pb-6 ${style.title}`}>Лента заказов</span>
            <div className={`${style.content}`}>
                <div className={`custom-scroll pr-2 ${style.orderFeed}`}>
                    {
                        orderFeed
                        && orderFeed.data
                        && orderFeed.data.orders
                        && orderFeed.data.orders.map((data: TOrder, index: number) => (
                                <OrderRow order={data} key={data.number} />
                            )
                        )
                    }
                </div>
                <div className={`pr-15 pl-15 ${style.generalInformationAboutOrders}`}>
                    <div className={`${style.kitchenOrderStatuses} pb-15`}>
                        <div className={`${style.readyOrders}`}>
                            <div className={`pb-6 text text_type_main-medium`}>
                                Готовы:
                            </div>
                            <div className={`${style.orderIds}`}>
                                {
                                    ordersInDone.map((data: TOrder, index: number) => (
                                        <span key={data.number} className={`text text_type_digits-default ${style.readyOrderId}`}>{data.number}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={`${style.ordersInProgress}`}>
                            <div className={`pb-6 text text_type_main-medium`}>
                                В работе:
                            </div>
                            <div className={`${style.orderIds}`}>
                                {
                                    ordersInPending.map((data: TOrder, index: number) => (
                                        <span key={data.number} className={`text text_type_digits-default ${style.pendingOrderId}`}>{data.number}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`pb-15`}>
                        <div className={`pb-6 text text_type_main-medium`}>
                            Выполнено за все время:
                        </div>
                        {
                            orderFeed && orderFeed.data && orderFeed.data.total &&
                            <div className={`text text_type_digits-large`}>
                                {orderFeed.data.total}
                            </div>
                        }
                    </div>
                    <div>
                        <div className={`pb-6 text text_type_main-medium`}>
                            Выполнено за сегодня:
                        </div>
                        {
                            orderFeed && orderFeed.data && orderFeed.data.totalToday &&
                            <div className={`text text_type_digits-large`}>
                                { orderFeed.data.totalToday }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderFeedPage;