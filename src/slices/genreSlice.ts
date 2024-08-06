import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre } from '../models/Genre';

interface GenreState {
  genres: Genre[];
}

const initialState: GenreState = {
  genres: [],
};

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenres(state, action: PayloadAction<Genre[]>) {
      state.genres = action.payload;
    },
  },
});

export const { setGenres } = genreSlice.actions;

export default genreSlice.reducer;