import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice'; // Adjust the path based on your folder structure
import breadcrumbsReducer from './slices/breadcrumbsSlice'; // Adjust the path based on your folder structure
const store = configureStore({
    reducer: {
        movies: movieReducer,
        breadcrumbs: breadcrumbsReducer
    }
});

export default store;