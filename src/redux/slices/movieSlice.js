import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    query: '',
    genre: null,
    sortBy: 'popularity.desc',
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setGenre: (state, action) => {
            state.genre = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const {
    setMovies,
    setQuery,
    setGenre,
    setSortBy,
    setLoading,
    setError
} = movieSlice.actions;

export default movieSlice.reducer;