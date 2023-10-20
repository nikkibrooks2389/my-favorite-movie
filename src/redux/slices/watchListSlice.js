// watchlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: [],
    reducers: {
        addToWatchlist: (state, action) => {
            console.log("action", action.payload)
            state.push(action.payload);
        },
        removeFromWatchlist: (state, action) => {
            const movieIdToRemove = action.payload.id;
            return state.filter((movie) => movie.id != movieIdToRemove);
        },
    },
});

// Add a selector to check if a movie is in the watchlist
export const selectIsInWatchlist = (state, movieId) => {
    return state.watchlist.some((movie) => movie.id == movieId)
}

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;