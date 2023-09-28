import { createSlice } from '@reduxjs/toolkit';

// Initial state for our movie slice
const initialState = {
    movies: [],         // Array to store list of movies
    selectedMovie: {},  // Object to store details of a selected movie
    favorites: [],      // Array to store favorite movies
    // status: 'idle',     // To track request status (idle, loading, success, failed)
    // error: null         // To track any error during request
};

// Creating our movie slice
const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        // moviesLoading: (state) => {
        //     if (state.status === 'idle') {
        //         state.status = 'loading';
        //     }
        // },
        // moviesReceived: (state, action) => {
        //     if (state.status === 'loading') {
        //         state.status = 'success';
        //         state.movies = action.payload;  // Storing the movies received
        //     }
        // },
        // moviesLoadFail: (state, action) => {
        //     if (state.status === 'loading') {
        //         state.status = 'failed';
        //         state.error = action.payload;   // Storing the error message
        //     }
        // },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(movie => movie.id !== action.payload.id);
        },
        // Add more reducers as needed
    }
});

// Exporting the actions generated by createSlice
export const { setSelectedMovie, addToFavorites, removeFromFavorites } = movieSlice.actions;

// Exporting the reducer
export default movieSlice.reducer;