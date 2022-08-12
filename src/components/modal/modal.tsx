import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModal = {
    onClose: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    children: React.ReactNode; /// ��� � ����� �� ���? ������ ���������� ��������� ��� ����?
}

const Modal: FunctionComponent<TModal> = ({ onClose, children }) => {
    const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    }

    const modalRoot = document.getElementById("react-modals") as HTMLElement;

    React.useEffect(() => {
        document.addEventListener("keydown", handleEscKey, false);

        return () => {
            document.removeEventListener("keydown", handleEscKey, false);
        };
    }, []
    )

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={`${style.modal} p-10`}>
                <button className={style.closeBtn} onClick={onClose} data-cy="modal_close_btn">
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>            
        </>,
        modalRoot
    );
}

export default Modal;