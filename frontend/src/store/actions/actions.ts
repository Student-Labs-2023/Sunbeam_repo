import axios from "axios";
import { AppDispatch } from "../store";
import { IImage, ServerResponse } from "../../models/models";
import { fetchSuccess, fetchError, fetching } from "../slices/imageSlice";

const UNSPLASH_ACCESS_KEY = "GyyS1_VKTlG6Wl6UEQpxM8un31gYgFDMl4tO48AkDeQ";

export const fetchImages = (page = 1, count = 25) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetching());
            const response = await axios.get<ServerResponse<IImage>>(`https://api.unsplash.com/photos`, {
                params: { page, count },
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                },
            });

            console.log(response.data); // работает ли api-шка
            dispatch(fetchSuccess(response.data.results));
        } catch (e) {
            dispatch(fetchError(e as Error));
        }
    };
};
