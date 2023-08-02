import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchImages } from "../../store/actions/actions";
import { IImage } from "../../models/models";
import { RootState } from "../../store/store";

function ImageGallery() {
    const dispatch = useAppDispatch();
    const { loading, images, error } = useAppSelector((state: RootState) => state.image);

    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1> image</h1>
            {images?.map((image) => (
                <div key={image.id}>
                    <img src={image.urls.regular} alt={image.description || image.user.name} />
                </div>
            ))}
        </div>
    );
}

export default ImageGallery;
