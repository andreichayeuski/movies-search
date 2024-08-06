import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../slices/favoritesSlice';
import genreReducer from '../slices/genreSlice';
import { movieApi } from '../services/movieApi';
import localStorageMiddleware from './localStorageMiddleware';
import { preloadGenres } from '../utils/genreUtils';

const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    if (serializedFavorites === null) {
      return undefined;
    }
    return JSON.parse(serializedFavorites);
  } catch (err) {
    console.error('Could not load favorites from localStorage', err);
    return undefined;
  }
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  [movieApi.reducerPath]: movieApi.reducer,
  genre: genreReducer,
});

const preloadedState = {
  favorites: { movies: loadFavorites() || [] }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware, movieApi.middleware),
  preloadedState,
});

preloadGenres();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
