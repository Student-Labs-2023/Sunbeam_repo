import React from 'react';
import Modal from 'react-modal';
import styles from './modalnew.module.css';
import {ModalProps, INew, ModalNewProps} from '../../models/models';
Modal.setAppElement('#root');

function ModalNew({ isOpen, onRequestClose, news }: ModalNewProps) {

    const monthNames = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day} ${monthNames[month]} ${year}`;
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} overlayClassName={styles.modalOverlay}>
            <div className={styles.modal_header}>
                <button className={styles.modal_close_button} onClick={onRequestClose}>
                    <img src="/png/button_close.png" alt="X" className={styles.close_icon} />
                </button>
            </div>
            <div className={styles.modal_content}>
                <div className={styles.title}>{news?.header}</div>
                <div className={styles.publishedAt}> {formatDate(news.new_published_at)}</div>
                <div className={styles.content}>{news?.content}</div>
                <img
                    src={`${process.env.REACT_APP_API_URL}${news.images.url}`}
                    className={styles.modal_image}
                    alt="image_from_server"
                />
            </div>
        </Modal>
    );
}

export default ModalNew;