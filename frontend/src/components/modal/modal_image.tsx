import React, {useState} from 'react';
import Modal from 'react-modal';
import styles from './modal_image.module.css';
import {IImage} from "../../models/models";
import Modal_Order from "./modal_order";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    image: IImage | null;
}

Modal.setAppElement('#root');

function Modal_Image ({ isOpen, onRequestClose, image }: ModalProps) {

    const [modalOrderIsOpen, setModalOrderIsOpen] = useState(false); // Состояние для второго модального окна

    const openModal_Order = () => {
        setModalOrderIsOpen(true);
    };

    const closeModal_Order = () => {
        setModalOrderIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} overlayClassName={styles.modalOverlay}>
            <div className={styles.modal_header}>
                <button className={styles.modal_close_button} onClick={onRequestClose}>
                    <img src="/png/button_close.png" alt="X" className={styles.close_icon} />
                </button>
            </div>
            <div className={styles.modal_content}>
                {image && <img
                    src={`http://localhost:1337${image.attributes.image.data[0].attributes.formats.thumbnail.url}`}
                    className={styles.modal_image}
                />}
            </div>
            <div className={styles.title}>{image?.attributes.title}</div>
            <div className={styles.author}>{image?.attributes.author.data.attributes.full_name}, {image?.attributes.author.data.attributes.age} лет</div>
            <div className={styles.description}>{image?.attributes.description || 'Без названия'} </div>
            <div className={styles.button} onClick={openModal_Order}> Купить за 1000 ₽ </div>
            <Modal_Order isOpen={modalOrderIsOpen} onRequestClose={closeModal_Order} />
        </Modal>
    );
}

export default Modal_Image;
