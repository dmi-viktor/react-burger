import Modal from '../modal/modal';
import modalImg from '../../images/modal-order.png';

import style from './order-details.module.css';

export default function OrderDetails() {
    return (
            <div className={style.mainModal}>
                <span className={`text text_type_digits-large pt-20 pb-8 ${style.modalIdOrder}`}>034536</span>
                <div className={`text text_type_main-medium pb-15 ${style.modalIdHint}`}>Идентификатор заказа</div>
                <div className={`pb-15 ${style.modalImg}`}><img src={modalImg} /></div>
                <div className={`text text_type_main-default pb-2  ${style.modalStatus}`}>Ваш заказ начали готовить</div>
                <div className={`text text_type_main-default text_color_inactive pb-20 ${style.modalMessage}`}>Дождитесь готовности на орбитальной станции</div>
            </div>
        );
}