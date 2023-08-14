import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IImage } from "../../models/models";
import { RootState } from "../../store/store";
import axios from "../../axios";
import styles from './imagegallery.module.css';
import CustomModal from "../../components/modal/modal";

function ImageGallery() {
    const dispatch = useAppDispatch();
    const { /*loading,*/ /*images,*/ error } = useAppSelector((state: RootState) => state.image);

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<IImage[]>([]);
    const [modalStates, setModalStates] = useState<boolean[]>([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:1337/api/pictures/?populate=*`,
        ).then((response: any) => {
            setLoading(false);
            setImages(response.data.data);
            setModalStates(response.data.data.map(() => false));
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
            {loading ? <h1> Загрузка картин... </h1> : (
                <div>
                    <img src="/png/zavitushka3.png" alt="завитушка" className={styles.zavitushka}/>
                    <img src="/png/starartshop.png" alt="завитушка" className={styles.star}/>
                    {imagesInRows.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.imageRow}>
                            {row.map((image: IImage, imageIndex) => (
                                <div key={image.id} className={styles.imageWrapper}>
                                    <img
                                        src={`http://localhost:1337${image.attributes.image.data[0].attributes.formats.thumbnail.url}`}
                                        /*alt={image.attributes.description || image.attributes.picture_author.data.attributes.name}*/
                                        className={styles.everyimage}
                                    />
                                    <div className={styles.textWrapper}>
                                        <div className={styles.title}>{image.attributes.title}</div>
                                    </div>
                                    <div className={styles.button} onClick={() => openModal(rowIndex, imageIndex)}>
                                        Подробнее
                                    </div>
                                    <CustomModal
                                        isOpen={modalStates[rowIndex * 3 + imageIndex]}
                                        onRequestClose={() => closeModal(rowIndex, imageIndex)}
                                        image={image}
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
