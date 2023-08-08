import React from 'react';
import Modal from 'react-modal';
import styles from './modal.module.css';
import {IImage} from "../../models/models";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    image: IImage | null;
}

Modal.setAppElement('#root');

function CustomModal({ isOpen, onRequestClose, image }: ModalProps) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} overlayClassName={styles.modalOverlay}>
            <div className={styles.modal_header}>
                <div className={styles.modal_title}>{image?.description || 'Без названия'}</div>
                <button className={styles.modal_close_button} onClick={onRequestClose}>
                    <img src="/png/button_close.png" alt="X" className={styles.close_icon} />
                </button>
            </div>
            <div className={styles.modal_content}>
                {image && <img src={image.urls.small} alt={image.description || 'Без названия'} className={styles.modal_image} />}
            </div>
        </Modal>
    );
}

export default CustomModal;
