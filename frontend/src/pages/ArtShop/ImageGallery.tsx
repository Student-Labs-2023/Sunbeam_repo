import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchImages } from "../../store/actions/actions";
import { IImage, ServerResponse } from "../../models/models";
import { RootState } from "../../store/store";
import axios from "../../axios";
import styles from './imagegallery.module.css';

function ImageGallery() {
    const dispatch = useAppDispatch();
    const { /*loading,*/ /*images,*/ error } = useAppSelector((state: RootState) => state.image);

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<IImage[]>([]);

    const UNSPLASH_ACCESS_KEY = "GyyS1_VKTlG6Wl6UEQpxM8un31gYgFDMl4tO48AkDeQ";

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.unsplash.com/photos`, {
            params: { page: 1, per_page: 25 }, // Use per_page instead of count
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        }).then((response) => {
            setLoading(false);
            setImages(response.data);
        });
    }, []);

    const chunkedImages = (arr: IImage[], size: number) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    const imagesInRows = chunkedImages(images, 3);

    return (
        <div className={styles.artshop}>
            <h1> Арт-лавка </h1>
            {loading ? <h1> ... </h1> : (
                <div>
                    {imagesInRows.map((row, index) => (
                        <div key={index} className={styles.imageRow}>
                            {row.map((image: IImage) => (
                                <div key={image.id} className={styles.imageWrapper}>
                                    <img src={image.urls.small} alt={image.description || image.user.name} className={styles.everyimage} />
                                    <div className={styles.username}>{image.user.name}</div>
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
