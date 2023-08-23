import React, { useEffect, useState } from "react";
import { IImage } from "../../models/models";
import styles from './imagegallery.module.css';
import ModalImage from "../../components/modal/ModalImage";
import { getPictures } from "../../api/api";

function ImageGallery() {

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<IImage[]>([]);
    const [modalStates, setModalStates] = useState<boolean[]>([]);

    useEffect(() => {
        setLoading(true);
        getPictures()
            .then((response: IImage[]) => {
                setLoading(false);
                setImages(response);
                setModalStates(response.map(() => false));
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    const chunkedImages = (arr: IImage[], size: number) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    const imagesInRows = chunkedImages(images, 3);

    const imagesInColumn = chunkedImages(images, 1);

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
        <>
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
                                            src={`${process.env.REACT_APP_API_URL}${image.image.formats.thumbnail.url}`}
                                            className={styles.everyimage} alt="image_from_server"
                                        />
                                        <div className={styles.textWrapper}>
                                            <div className={styles.title}>{image.title}</div>
                                        </div>
                                        <div className={styles.textWrapper}>
                                            <div className={styles.author}>{image.author.full_name}, {image.author.age} лет</div>
                                        </div>
                                        <div className={styles.button} onClick={() => openModal(rowIndex, imageIndex)}>
                                            Подробнее
                                        </div>
                                        <ModalImage
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
            <div className={styles.artshop_mobile}>
                <img src="/png/flowerartshop.png" alt="цветок" className={styles.flower}/>
                <div className={styles.centerText}>
                    Арт-лавка
                </div>
                <div className={styles.infoText}>
                    Здесь можно купить уже готовые работы <br/> наших юных художников или же заказать <br/> картину на любую тематику у учеников <br/> студии.
                    Все ученики, при желании, могут выставить свою работу на продажу. <br/>
                    Собранные средства будут использованы <br/> для развития нашей студии
                </div>
                <div className={styles.priceText}>
                    Цена всех работ фиксированная и составляет 1000 рублей
                </div>
                {loading ? <h1> Загрузка картин... </h1> : (
                    <div>
                        <img src="/png/zavitushka3.png" alt="завитушка" className={styles.zavitushka}/>
                        <img src="/png/starartshop.png" alt="завитушка" className={styles.star}/>
                        {imagesInColumn.map((row, rowIndex) => (
                            <div key={rowIndex} className={styles.imageColumn}>
                                {row.map((image: IImage, imageIndex) => (
                                    <div key={image.id} className={styles.imageWrapper}>
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}${image.image.formats.thumbnail.url}`}
                                            className={styles.everyimage} alt="image_from_server"
                                        />
                                        <div className={styles.textWrapper}>
                                            <div className={styles.title}>{image.title}</div>
                                        </div>
                                        <div className={styles.textWrapper}>
                                            <div className={styles.author}>{image.author.full_name}, {image.author.age} лет</div>
                                        </div>
                                        <div className={styles.button} onClick={() => openModal(rowIndex, imageIndex)}>
                                            Подробнее
                                        </div>
                                        <ModalImage
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
        </>
    );
}

export default ImageGallery;
