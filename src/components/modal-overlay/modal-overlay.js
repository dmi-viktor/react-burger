import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay({ onClose }) {
    return (
        <div className={style.Overlay} onClick={onClose}>
        </div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
};