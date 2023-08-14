import React from 'react';
import Modal from 'react-modal';
import styles from './modal_order.module.css';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

function Modal_Order({ isOpen, onRequestClose }: ModalOrderProps) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} overlayClassName={styles.modalOverlay}>
            <div className={styles.modal_header}>
                <button className={styles.modal_close_button} onClick={onRequestClose}>
                    <img src="/png/button_close.png" alt="X" className={styles.close_icon} />
                </button>
            </div>
            <div className={styles.modal_title}>Оформление заказа</div>
            <div className={styles.modal_content}>
                <div className={styles.order_info}>
                    <div className={styles.order_details}>
                        <div className={styles.order_name}>Имя фамилия</div>
                        <div className={styles.order_art}>Картина</div>
                        <div className={styles.order_price}>1000 ₽</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default Modal_Order;