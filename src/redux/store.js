import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';  // Importing our slice reducer

export const store = configureStore({
    reducer: {
        movie: movieReducer
    }
});