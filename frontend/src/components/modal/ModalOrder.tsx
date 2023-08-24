import React, { useState, useEffect, ChangeEvent, FormEvent, SetStateAction } from 'react';
import Modal from 'react-modal';
import styles from './modalorder.module.css';
import { IForm, ModalProps} from '../../models/models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postOrder } from "../../api/api";
import axios from '../../axios';

type Status = null | 'created' | 'sent' | 'paid' | 'expired';

function PaymentStatusIndicator({ status }: { status: Status }) {
    if (status == 'paid')
        return <>Чек оплачен, заказ принят</>

    if (status == 'expired')
        return <>Чек больше не актуален</>

    return <>Проверка оплаты...</>
}

function ModalOrder({ isOpen, onRequestClose, image }: ModalProps) {
    const [formData, setFormData] = useState<IForm>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
        email: '',
        region: '',
        city: '',
        street_house_apps: '',
        index: '',
        delivery_method: '',
    });

    const [errorMessages, setErrorMessages] = useState<IForm>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
        email: '',
        region: '',
        city: '',
        street_house_apps: '',
        index: '',
        delivery_method: '',
    });

    const [paymentStatus, setPaymentStatus] = useState<Status>(null);

    const handleDeliveryMethodChange = (method: string) => {
        setFormData((prevData) => ({
            ...prevData,
            delivery_method: method,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const validationErrors = validateFormData(formData);

        // Если выбран способ "Самовывоз", убираем обязательность полей адреса
        if (formData.delivery_method === 'Самовывоз') {
            delete validationErrors.region;
            delete validationErrors.city;
            delete validationErrors.street_house_apps;
            delete validationErrors.index;
        }

        if (Object.keys(validationErrors).length === 0) {
            const full_name = [formData.last_name, formData.first_name, formData.middle_name].filter(Boolean).join(' ');
            const delivery_adress = formData.delivery_method === 'Самовывоз' ? 'Самовывоз' : [formData.region, formData.city, formData.street_house_apps, formData.index].join(', ');
            const updatedFormData = { ...formData, full_name, delivery_adress, picture: image, invoice_id: null};

            const { invoice_url, invoice_id } = (await axios.post('/api/payment', {
                payAmount: 1000,
                clientEmail: updatedFormData.email,
                clientPhone: updatedFormData.phone_number,
            })).data;

            window.open(invoice_url, '_blank');

            const interval = setInterval(async () => {
                const status = (await axios.get('/api/payment?id=' + invoice_id)).data.status;
                if (status == 'paid') {
                    try {
                        updatedFormData.invoice_id = invoice_id;
                        const response = await postOrder(updatedFormData);
                        console.log('Successful POST Response:', response);

                        toast.success('Data submitted successfully!', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        clearInterval(interval);
                    } catch (error) {
                        console.error('Error in POST Request:', error);

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
                }
                setPaymentStatus(status);
            }, 1000)
        } else {
            setErrorMessages(validationErrors as SetStateAction<IForm>);

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

        if (name === "last_name" || name === "first_name" || name === "middle_name" || name === "city" || name === "region") {
            // Фильтруем введенные символы, оставляя только буквы и пробелы
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
            errors.first_name = 'Введите имя обязательно';
        }
        if (!data.last_name) {
            errors.last_name = 'Введите фамилию обязательно';
        }
        if (!data.phone_number) {
            errors.phone_number = 'Введите телефон обязательно';
        }
        if (!data.email) {
            errors.email = 'Введите почту обязательно';
        }
        if (!data.region) {
            errors.region = 'Введите область обязательно';
        }
        if (!data.city) {
            errors.city = 'Введите город обязательно';
        }
        if (!data.street_house_apps) {
            errors.street_house_apps = 'Введите адрес обязательно';
        }
        if (!data.index) {
            errors.index = 'Введите индекс обязательно';
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
                    {image?.author.full_name}, "{image?.title}"
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
                        {formData.delivery_method === "Доставка" && (
                            <>
                                <div className={styles.input_addContainer}>
                                    <label className={styles.inputLabel}>Край/область/регион:*</label>
                                    <input
                                        type="text"
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                        className={styles.inputField}
                                        placeholder="Край/область/регион"
                                    />
                                    {errorMessages.region && <span className={styles.error}>{errorMessages.region}</span>}
                                </div>
                                <div className={styles.input_addContainer}>
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
                            </>
                        )}
                    </div>
                    <div className={styles.secondLayer}>
                        {/* Second column */}
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
                        <div className={styles.buttonsContainer}>
                            <button
                                type="button"
                                className={`${styles.deliveryButton} ${formData.delivery_method === 'Доставка' ? styles.selected : ''}`}
                                onClick={() => handleDeliveryMethodChange('Доставка')}
                            >
                                <span className={styles.deliveryLabel}>Доставка</span>
                            </button>
                            <button
                                type="button"
                                className={`${styles.pickupButton} ${formData.delivery_method === 'Самовывоз' ? styles.selected : ''}`}
                                onClick={() => handleDeliveryMethodChange('Самовывоз')}
                            >
                                <span className={styles.pickupLabel}>Самовывоз по адресу:</span>
                                <span className={styles.addressLabel}>г. Омск, ул. Энергетиков, 70</span>
                            </button>
                        </div>
                        {formData.delivery_method === "Доставка" && (
                            <div className={styles.secondLayer}>
                                <div className={styles.input_addContainer}>
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
                                <div className={styles.input_addContainer}>
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
                        )}
                    </div>
                </div>
                <PaymentStatusIndicator status={paymentStatus} />
                <button type="submit" className={styles.submitButton}>Купить за 1000 ₽</button>
            </form>
        </Modal>
    );
}

export default ModalOrder;
