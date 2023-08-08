import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImage } from "../../models/models";

interface ImageState {
    loading: boolean;
    error: string;
    count: number;
    images: IImage[];
}

const initialState: ImageState = {
    loading: false,
    error: "",
    count: 0,
    images: []
};

export const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action: PayloadAction<IImage[]>) => {
            state.loading = false;
            state.images = action.payload;
        },
        fetchError: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { fetching, fetchSuccess, fetchError } = imageSlice.actions;
export default imageSlice.reducer;
