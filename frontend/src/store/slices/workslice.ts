import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создание асинхронного thunk для получения данных о работах
export const fetchWorks = createAsyncThunk('works/fetchWorks', async () => {
    const response = await axios.get('/works');
    return response.data;
});

const worksSlice = createSlice({
    name: 'works',
    initialState: {
        // переделать
        data: [], // Начальное состояние - пустой массив работ
        status: 'idle', // Статус запроса (idle, pending, fulfilled, rejected)
        error: null, // Ошибка, если запрос завершился неудачно
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorks.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchWorks.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.data = action.payload;
            })
            .addCase(fetchWorks.rejected, (state, action) => {
                state.status = 'rejected';
                /*state.error = action.error.message;*/
            });
    },
});

export default worksSlice.reducer;