
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import watchlistReducer from './slices/watchListSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    movies: movieReducer,
    watchlist: watchlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});



export default store;