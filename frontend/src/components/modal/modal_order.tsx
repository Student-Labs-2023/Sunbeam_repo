import React, { useState, ChangeEvent, FormEvent, SetStateAction } from 'react';
import Modal from 'react-modal';
import styles from './modal_order.module.css';
import { IImage } from '../../models/models';
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    image: IImage | null;
}

interface FormData {
    first_name: string,
    last_name: string,
    middle_name: string,
    phone_number: string,
}

function Modal_Order({ isOpen, onRequestClose, image }: ModalOrderProps) {
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
    });

    const [errorMessages, setErrorMessages] = useState<FormData>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Формирование full_name
            const fullName = [formData.last_name, formData.first_name, formData.middle_name].filter(Boolean).join(' ');

            const updatedFormData = { ...formData, full_name: fullName };

            console.log('Form Data:', updatedFormData);

            try {
                const response = await axios.post('http://localhost:1337/api/buyers', {
                    "data": updatedFormData,
                });
                console.log('Successful POST Response:', response.data);

                // Display a success toast notification
                toast.success('Data submitted successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Handle successful response here
            } catch (error) {
                console.error('Error in POST Request:', error);
                // Handle error here

                // Display an error toast notification
                toast.error('An error occurred. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            setErrorMessages(validationErrors as SetStateAction<FormData>);

            // Display an error toast notification for validation errors
            toast.error('Please fill out all required fields correctly.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        let filteredValue = value;

        if (name === "name") {
            // Фильтруем введенные символы, оставляя только буквы
            filteredValue = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
        } else if (name === "phone_number") {
            // Фильтруем введенные символы, оставляя только цифры и символ "+"
            filteredValue = value.replace(/[^\d+]/g, '');
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: filteredValue,
        }));
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Очищаем сообщение об ошибке при начале ввода
        }));
    };

    const validateFormData = (data: FormData) => {
        const errors: Partial<FormData> = {};

        if (!data.first_name) {
            errors.first_name = 'Name is required';
        }
        if (!data.phone_number) {
            errors.phone_number = 'Phone number is required';
        }

        return errors;
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContainer} overlayClassName={styles.modalOverlay}>
            <ToastContainer />
            <div className={styles.modal_header}>
                <button className={styles.modal_close_button} onClick={onRequestClose}>
                    <img src="/png/button_close.png" alt="X" className={styles.close_icon} />
                </button>
            </div>
            <div className={styles.modal_title}>Оформление заказа</div>
            <div className={styles.order_details}>
                <img src="/png/line_order.png" alt="line_order" className={styles.line_order} style={{ margin: '10px' }} />
                <span style={{ margin: '0px 70px' }}>
                    {image?.attributes.author.data.attributes.full_name}, "{image?.attributes.title}"
                </span>
                <span style={{ margin: '0 70px' }}>
                    1000 Р
                </span>
                <img src="/png/line_order.png" alt="line_order" className={styles.line_order} />
            </div>
            <div className={styles.necessarily}> * Поля, отмеченные звёздочкой, обязательны для заполнения </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="Имя"
                    />
                    {errorMessages.first_name && <span className={styles.error}>{errorMessages.first_name}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Фамилия"
                    />
                    {errorMessages.last_name && <span className={styles.error}>{errorMessages.last_name}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleInputChange}
                        placeholder="Отчество"
                    />
                    {errorMessages.middle_name && <span className={styles.error}>{errorMessages.middle_name}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder="Телефон"
                    />
                    {errorMessages.phone_number && <span className={styles.error}>{errorMessages.phone_number}</span>}
                </div>
                <button type="submit">Добавить пользователя</button>
            </form>
        </Modal>
    );
}

export default Modal_Order;