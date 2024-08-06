import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const state = storeAPI.getState() as RootState;
  const prevFavorites = localStorage.getItem('favorites');
  const currentFavorites = JSON.stringify(state.favorites.movies);

  if (prevFavorites !== currentFavorites) {
    localStorage.setItem('favorites', currentFavorites);
  }

  return result;
};

export default localStorageMiddleware;
