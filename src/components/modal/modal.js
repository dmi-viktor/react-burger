import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, onClose }) {
    const keystrokeEscape = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", keystrokeEscape, false);

        return () => {
            document.removeEventListener("keydown", keystrokeEscape, false);
        };
    }, []
    )

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={`${style.Modal} p-10`}>
                <button className={style.CloseBtn} onClick={onClose}>
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>            
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element.isRequired
};