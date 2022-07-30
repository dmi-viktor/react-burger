import React from 'react';
import modalImg from '../../images/modal-order.png';
import style from './order-details.module.css';
import { useSelector } from '../../services/hooks';

export default function OrderDetails() {
    const order = useSelector(state => state.order);

    return (
        <div className={style.mainModal}>
            {
                order && order.orderDetails &&
                <>
                    <span className={`text text_type_digits-large pt-20 pb-8 ${style.modalIdOrder}`}>{order.orderDetails.order.number}</span>
                    <div className={`text text_type_main-medium pb-15 ${style.modalIdHint}`}>Идентификатор заказа</div>
                    <div className={`pb-15 ${style.modalImg}`}><img src={modalImg} /></div>
                    <div className={`text text_type_main-default pb-2  ${style.modalStatus}`}>Ваш заказ начали готовить</div>
                    <div className={`text text_type_main-default text_color_inactive pb-20 ${style.modalMessage}`}>Дождитесь готовности на орбитальной станции</div>
                </>
            }
        </div>
    );
}