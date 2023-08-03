import React, {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchImages } from "../../store/actions/actions";
import {IImage, ServerResponse} from "../../models/models";
import { RootState } from "../../store/store";
import axios from "../../axios";

function ImageGallery() {
    const dispatch = useAppDispatch();
    const {/*loading,*/ /*images,*/ error } = useAppSelector((state: RootState) => state.image);

    const [loading, setLoading] = useState(true);

    const [images, setImages] = useState<IImage[]>([])

    const UNSPLASH_ACCESS_KEY = "GyyS1_VKTlG6Wl6UEQpxM8un31gYgFDMl4tO48AkDeQ";

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.unsplash.com/photos`, {
            params: {page: 1, count: 25},
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        }).then((data) => {setLoading(false); setImages(data.data)})
    }, []);

    return (
        <div>
            <h1> image </h1>
             {loading? <h1> ... </h1> : images?.map((image) => (
                <div key={image.id}>
                    <img src={image.urls.regular} alt={image.description || image.user.name} />
                </div>
            ))}
        </div>
    );
}

export default ImageGallery;
