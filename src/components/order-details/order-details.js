import Modal from '../modal/modal';
import modalImg from '../../images/modal-order.png';
import PropTypes from 'prop-types';

import style from './order-details.module.css';

export default function OrderDetails({ onClose }) {
    return (
            <Modal onClose={onClose}>
                <div className={style.MainModal}>
                    <span className={`text text_type_digits-large pt-20 pb-8 ${style.ModalIdOrder}`}>034536</span>
                    <div className={`text text_type_main-medium pb-15 ${style.ModalIdHint}`}>Идентификатор заказа</div>
                    <div className={`pb-15 ${style.ModalImg}`}><img src={modalImg} /></div>
                    <div className={`text text_type_main-default pb-2  ${style.ModalStatus}`}>Ваш заказ начали готовить</div>
                    <div className={`text text_type_main-default text_color_inactive pb-20 ${style.ModalMessage}`}>Дождитесь готовности на орбитальной станции</div>
                </div>
            </Modal>        
        );
}

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired
};