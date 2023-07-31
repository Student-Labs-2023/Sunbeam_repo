import axios from "axios";
import { AppDispatch } from "../store";
import { IImage, ServerResponse } from "../../models/models";
import { fetchSuccess, fetchError, fetching } from "../slices/imageSlice";

export const fetchImages = (page = 1, count = 25) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(fetching()); // Correct action name
            const response = await axios.get<ServerResponse<IImage>>(`https://api.example.com/images`, {
                params: { page, count },
            });
            dispatch(fetchSuccess(response.data.results));
        } catch (e) {
            dispatch(fetchError(e as Error));
        }
    };
};
