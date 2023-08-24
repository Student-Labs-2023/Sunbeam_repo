import React, {useState} from 'react';
import Modal from 'react-modal';
import styles from './modalnew.module.css';
import {ModalNewProps} from '../../models/models';
Modal.setAppElement('#root');

function ModalNew({ isOpen, onRequestClose, news }: ModalNewProps) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? news.images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === news.images.length - 1 ? 0 : prevIndex + 1));
    };

    const multipleImages = news.images.length > 1;

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
                <div className={`${styles.publishedAt} ${styles.leftAligned}`}>{formatDate(news.new_published_at)}</div>
                <div className={styles.content}>{news?.content}</div>
                <img
                    src={`${process.env.REACT_APP_API_URL}${news.images[currentIndex].url}`} // Используем текущий индекс
                    className={styles.modal_image}
                    alt="image_from_server"
                />
                <div className={styles.modal_nav_buttons}>
                    {multipleImages && (
                        <>
                            <button className={styles.modal_nav_button} onClick={prevSlide}>
                                <img src="/png/left_button.png" alt="left_button" />
                            </button>
                            <div className={styles.dot_indicator}>
                                {news.images.map((program, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.dot} ${index === currentIndex ? styles.active_dot : ''}`}
                                    />
                                ))}
                            </div>
                            <button className={styles.modal_nav_button} onClick={nextSlide}>
                                <img src="/png/right_button.png" alt="right_button"/>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default ModalNew;