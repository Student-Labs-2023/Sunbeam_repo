import {combineReducers, configureStore} from "@reduxjs/toolkit";
import imageReducer from "./slices/imageSlice"

const rootReducer = combineReducers({
    image: imageReducer,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']