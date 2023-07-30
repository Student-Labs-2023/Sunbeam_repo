import { configureStore } from '@reduxjs/toolkit';
import worksReducer from './slices/workslice';

const store = configureStore({
    reducer: {
        works: worksReducer,
    },
});

export default store;
