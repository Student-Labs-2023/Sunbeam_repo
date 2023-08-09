import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchImages } from "../../store/actions/actions";
import { IImage, ServerResponse } from "../../models/models";
import { RootState } from "../../store/store";
import axios from "../../axios";
import styles from './imagegallery.module.css';
import CustomModal from "../components/modal/modal";

function ImageGallery() {
    const dispatch = useAppDispatch();
    const { /*loading,*/ /*images,*/ error } = useAppSelector((state: RootState) => state.image);

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<IImage[]>([]);
    const [modalStates, setModalStates] = useState<boolean[]>([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/picture-author`, {
            params: { page: 1, per_page: 12 },
            headers: {
                Authorization: `Bearer 10f41287f8cc4801cb97c95eed16360c1aa6f5f0e392bf89d00e8e7ed601e3978d02a10bfdf5bb698fbb8986ab08c79fcafddeff80002f997b6daac6ad4d746ef27b1176de68fd26cb7ddcb40b7f97100551971883428f1b01d0682fb4b995eb10e26933649c08a0312a31eb8d0bd071054f1912fdb8994f0d065b577cac0519`,
            },
        }).then((response) => {
            setLoading(false);
            setImages(response.data);
            setModalStates(response.data.map(() => false));
        });
    }, []);

    const chunkedImages = (arr: IImage[], size: number) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    const imagesInRows = chunkedImages(images, 3);

    const [selectedImages, setSelectedImages] = useState<Array<IImage | null>>(Array(imagesInRows.length).fill(null));

    const openModal = (rowIndex: number, imageIndex: number) => {
        const updatedSelectedImages = [...selectedImages];
        updatedSelectedImages[rowIndex] = imagesInRows[rowIndex][imageIndex];
        setSelectedImages(updatedSelectedImages);

        const updatedStates = [...modalStates];
        updatedStates[rowIndex * 3 + imageIndex] = true;
        setModalStates(updatedStates);
    };

    const closeModal = (rowIndex: number, imageIndex: number) => {
        const updatedStates = [...modalStates];
        updatedStates[rowIndex * 3 + imageIndex] = false;
        setModalStates(updatedStates);
    };

    return (
        <div className={styles.artshop}>
            <img src="/png/flowerartshop.png" alt="цветок" className={styles.flower}/>
            <img src="/png/zavitushka3.png" alt="завитушка" className={styles.zavitushka}/>
            <img src="/png/starartshop.png" alt="завитушка" className={styles.star}/>
            <div className={styles.centerText}>
                Арт-лавка
            </div>
            <div className={styles.infoText}>
                Здесь можно купить уже готовые работы наших юных художников <br/> или же заказать картину на любую тематику у учеников студии.<br/>
                Все ученики, при желании, могут выставить свою работу на продажу. <br/>
                Собранные средства будут использованы для развития нашей студии
            </div>
            <div className={styles.priceText}>
                Цена всех работ фиксированная и составляет 1000 рублей
            </div>
            {loading ? <h1> Загрузка картин </h1> : (
                <div>
                    {imagesInRows.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.imageRow}>
                            {row.map((image: IImage, imageIndex) => (
                                <div key={image.id} className={styles.imageWrapper}>
                                    <img src={image.urls.small} alt={image.description || image.user.name} className={styles.everyimage} />
                                    <div className={styles.textWrapper}>
                                        <div className={styles.username}>{image.user.name}</div>
                                    </div>
                                    <div className={styles.button} onClick={() => openModal(rowIndex, imageIndex)}>
                                        Подробнее
                                    </div>
                                    <CustomModal
                                        isOpen={modalStates[rowIndex * 3 + imageIndex]}
                                        onRequestClose={() => closeModal(rowIndex, imageIndex)}
                                        image={selectedImages[rowIndex]}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageGallery;
