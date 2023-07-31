import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import { RootState } from "../../store/store";
import { fetchImages } from "../../store/actions/actions";
import { IImage } from "../../models/models";

const ImageGallery: React.FC = () => {

    const dispatch = useAppDispatch();
    const { loading, images, error } = useSelector((state: RootState) => state.image);

    useEffect(() => {
        dispatch (fetchImages());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Image Gallery</h1>
            {images.map((image: IImage) => (
                <div key={image.id}>
                    <img src={image.imageUrl} alt={image.description} />
                    <p>Author: {image.author}</p>
                    <p>Description: {image.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;
