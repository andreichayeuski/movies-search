import { Genre } from '../models/Genre';
import { store } from '../store/store';
import { setGenres } from '../slices/genreSlice';
import { movieApi } from '../services/movieApi';

export const getGenreNames = (genres: Genre[]): string => {
  return genres
    ? genres
      .map((genre) => genre.name)
      .filter(Boolean)
      .join(', ')
    : "";
};

export const preloadGenres = async () => {
  const result = await store.dispatch(movieApi.endpoints.getGenres.initiate(undefined));
  if (result.data) {
    store.dispatch(setGenres(result.data));
  } else {
    console.error('Failed to preload genres', result.error);
  }
};
