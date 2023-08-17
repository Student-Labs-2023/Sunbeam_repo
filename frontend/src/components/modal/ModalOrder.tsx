import React, { useState, ChangeEvent, FormEvent, SetStateAction } from 'react';
import Modal from 'react-modal';
import styles from './modalorder.module.css';
import { IForm, ModalProps } from '../../models/models';
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalOrder({ isOpen, onRequestClose, image }: ModalProps) {
    const [formData, setFormData] = useState<IForm>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
        email: '',
        country: '',
        region: '',
        city: '',
        street_house_apps: '',
        index: '',
    });

    const [errorMessages, setErrorMessages] = useState<IForm>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
        email: '',
        country: '',
        region: '',
        city: '',
        street_house_apps: '',
        index: '',
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Формирование full_name
            const full_name = [formData.last_name, formData.first_name, formData.middle_name].filter(Boolean).join(' ');

            const delivery_adress = [formData.country, formData.region, formData.city, formData.street_house_apps, formData.index].join(' ')

            const updatedFormData = { ...formData, full_name: full_name, delivery_adress: delivery_adress };

            console.log('Form Data:', updatedFormData);

            try {
                const response = await axios.post('/api/orders', {
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
            setErrorMessages(validationErrors as SetStateAction<IForm>);

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
        } else if (name === "index") {
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

    const validateFormData = (data: IForm) => {
        const errors: Partial<IForm> = {};

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
                    1000 ₽
                </span>
                <img src="/png/line_order.png" alt="line_order" className={styles.line_order} />
            </div>
            <div className={styles.necessarily}> * Поля, отмеченные звёздочкой, обязательны для заполнения </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputLayer}>
                    <div className={styles.firstLayer}>
                        {/* First column */}
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Фамилия:*</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Фамилия"
                            />
                            {errorMessages.last_name && <span className={styles.error}>{errorMessages.last_name}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Имя:* </label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Имя"
                            />
                            {errorMessages.first_name && <span className={styles.error}>{errorMessages.first_name}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Отчество</label>
                            <input
                                type="text"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Отчество"
                            />
                            {errorMessages.middle_name && <span className={styles.error}>{errorMessages.middle_name}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Номер телефона:*</label>
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Телефон"
                            />
                            {errorMessages.phone_number && <span className={styles.error}>{errorMessages.phone_number}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Электронная почта:*</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Электронная почта"
                            />
                            {errorMessages.email && <span className={styles.error}>{errorMessages.email}</span>}
                        </div>
                    </div>
                    <div className={styles.secondLayer}>
                        {/* Second column */}
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Страна:*</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Страна"
                            />
                            {errorMessages.country && <span className={styles.error}>{errorMessages.country}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Край/область/регион:* </label>
                            <input
                                type="text"
                                name="region"
                                value={formData.region}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Область"
                            />
                            {errorMessages.region && <span className={styles.error}>{errorMessages.region}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Город:*</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Город"
                            />
                            {errorMessages.city && <span className={styles.error}>{errorMessages.city}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Улица, дом, квартира:*</label>
                            <input
                                type="text"
                                name="street_house_apps"
                                value={formData.street_house_apps}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Улица, дом, квартира"
                            />
                            {errorMessages.street_house_apps && <span className={styles.error}>{errorMessages.street_house_apps}</span>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Индекс:*</label>
                            <input
                                type="text"
                                name="index"
                                value={formData.index}
                                onChange={handleInputChange}
                                className={styles.inputField}
                                placeholder="Индекс"
                            />
                            {errorMessages.index && <span className={styles.error}>{errorMessages.index}</span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className={styles.submitButton}>Купить за 1000 ₽</button>
            </form>
        </Modal>
    );
}

export default ModalOrder;