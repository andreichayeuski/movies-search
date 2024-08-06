import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteMovie } from '../models/FavoriteMovie';
import { Movie } from '../models/Movie';

interface FavoritesState {
  movies: FavoriteMovie[];
}

const initialState: FavoritesState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingMovie = state.movies.find((m) => m.id === movie.id);
      if (!existingMovie) {
        state.movies.push({
          id: movie.id,
          userRating: movie.userRating,
          notes: movie.notes,
          watched: movie.watched,
        });
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
    toggleWatched: (state, action: PayloadAction<number>) => {
      const movie = state.movies.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.watched = !movie.watched;
      }
    },
    updateNotes: (state, action: PayloadAction<{ id: number; notes: string }>) => {
      const movie = state.movies.find((movie) => movie.id === action.payload.id);
      if (movie) {
        movie.notes = action.payload.notes;
      }
    },
    updateRating: (state, action: PayloadAction<{ id: number; rating: number }>) => {
      const movie = state.movies.find((movie) => movie.id === action.payload.id);
      if (movie) {
        movie.userRating = action.payload.rating;
      }
    },
    setFavorites: (state, action: PayloadAction<FavoriteMovie[]>) => {
      state.movies = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, toggleWatched, updateNotes, updateRating, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
