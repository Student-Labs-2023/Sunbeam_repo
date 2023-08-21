import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './modalimage.module.css';
import { ModalProps } from '../../models/models';
import ModalOrder from './ModalOrder';

Modal.setAppElement('#root');

function ModalImage({ isOpen, onRequestClose, image }: ModalProps) {
    const [modalOrderIsOpen, setModalOrderIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openModalOrder = () => {
        setModalOrderIsOpen(true);
    };

    const closeModalOrder = () => {
        setModalOrderIsOpen(false);
    };

    const nextImage = () => {
        if (image && Object.keys(image.image.formats).length > 1) {
            const newIndex = (currentImageIndex + 1) % Object.keys(image.image.formats).length;
            setCurrentImageIndex(newIndex);
        }
    };

    const prevImage = () => {
        if (image && Object.keys(image.image.formats).length > 1) {
            const newIndex = (currentImageIndex - 1 + Object.keys(image.image.formats).length) % Object.keys(image.image.formats).length;
            setCurrentImageIndex(newIndex);
        }
    };

    const isOnlyImage = image?.image.formats && Object.keys(image.image.formats).length === 1;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} overlayClassName={styles.modalOverlay}>
            <div className={styles.modal_header}>
                <button className={styles.modal_close_button} onClick={onRequestClose}>
                    <img src="/png/button_close.png" alt="X" className={styles.close_icon} />
                </button>
            </div>
            <div className={styles.modal_content}>
                {image && (
                    <div className={styles.image_container}>
                        <img
                            src={`http://localhost:1337${image.image.formats.thumbnail.url}`}
                            className={styles.modal_image}
                            alt="image_from_server"
                        />
                        {!isOnlyImage && (
                            <div className={styles.modal_nav_buttons}>
                                <button className={styles.modal_nav_button} onClick={prevImage}>
                                    <img src="/png/left_button.png" alt="left_button" />
                                </button>
                                <div className={styles.dot_indicator}>
                                    {Object.keys(image.image.formats).map((formatKey, index) => (
                                        <div
                                            key={formatKey}
                                            className={`${styles.dot} ${index === currentImageIndex ? styles.active_dot : ''}`}
                                        />
                                    ))}
                                </div>
                                <button className={styles.modal_nav_button} onClick={nextImage}>
                                    <img src="/png/right_button.png" alt="right_button"/>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.title}>{image?.title}</div>
            <div className={styles.author}>{image?.author.full_name}, {image?.author.age} лет</div>
            <div className={styles.description}>{image?.description || 'Без названия'} </div>
            <div className={styles.button_container}>
                <div className={styles.button} onClick={openModalOrder}>
                    Купить за 1000 ₽
                </div>
            </div>
            <ModalOrder isOpen={modalOrderIsOpen} onRequestClose={closeModalOrder} image={image} />
        </Modal>
    );
}

export default ModalImage;
