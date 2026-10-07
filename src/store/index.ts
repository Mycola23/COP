import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './slices/filtersSlice';
import { favoritesReducer } from './slices/favoritesSlice';
import { countriesReducer } from './slices/countriesSlice';
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    favorites: favoritesReducer,
    countries: countriesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;