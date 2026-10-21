import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CountrySummary, FavoritesState } from '@/types';

const initialState: FavoritesState = {
  items: [],
  byCode: {},
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<CountrySummary | string>) {
      const payload = action.payload;
      const code = (typeof payload === 'string' ? payload : payload.code).toUpperCase();
      const index = state.items.indexOf(code);

      if (index >= 0) {
        state.items.splice(index, 1);
        delete state.byCode[code];
      } else {
        state.items.push(code);
        if (typeof payload !== 'string') {
          state.byCode[code] = payload;
        }
      }
    },
    clearFavorites(state) {
      state.items = [];
      state.byCode = {};
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;