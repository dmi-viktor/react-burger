import React, { FC } from 'react';
import style from './ingredient-details.module.css';
import OrderStatusDetails from '../components/order-status-details/order-status-details';

const OrderStatusDetailsPage: FC = () => {
    return (
        <div className={`${style.wrapper} p-10`}>
            <OrderStatusDetails/>
        </div>
    );
}

export default OrderStatusDetailsPage;