import React, { FC } from 'react';
import style from './ingredient-details.module.css';
import OrderStatusDetails from '../components/order-status-details/order-status-details';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import { getOrderHistoryURL, ORDER_FEED_URL } from '../utils/burger-api';
import { wsConnect as wsConnectOrderHistory, wsClose as wsCloseOrderHistory } from '../services/actions/wsOrderHistoryTypes';
import { wsConnect as wsConnectOrderFeed, wsClose as wsCloseOrderFeed } from '../services/actions/wsOrderFeedTypes';


const OrderStatusDetailsPage: FC = () => {
    const dispatch = useDispatch();
    const isFeed = !!useRouteMatch({ path: "/feed" })

    React.useEffect(() => {
        if (isFeed) {
            dispatch(wsConnectOrderFeed(ORDER_FEED_URL));
        }
        else {
            dispatch(wsConnectOrderHistory(getOrderHistoryURL() as string));
        }

        return () => {
            if (isFeed) {
                dispatch(wsCloseOrderFeed());
            }
            else {
                dispatch(wsCloseOrderHistory());
            }
        }
    }, []);

    return (
        <div className={`${style.wrapper} p-10`}>
            <OrderStatusDetails/>
        </div>
    );
}

export default OrderStatusDetailsPage;