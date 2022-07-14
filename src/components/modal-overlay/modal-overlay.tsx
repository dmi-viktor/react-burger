import style from './modal-overlay.module.css';

export default function ModalOverlay({ onClose }: { onClose: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }) {
    return (
        <div className={style.overlay} onClick={onClose}>
        </div>
    );
}