import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_COUNTRY_FILTERS } from '@/constants';
import type { CountryFilters } from '@/types';

const initialState: CountryFilters = DEFAULT_COUNTRY_FILTERS;

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setUnOnly(state, action: PayloadAction<boolean>) {
      state.unOnly = action.payload;
    },
    setFilters(_state, action: PayloadAction<CountryFilters>) {
      return action.payload;
    },
    resetFilters() {
      return DEFAULT_COUNTRY_FILTERS;
    },
  },
});

export const { setQuery, setRegion, setLimit, setUnOnly, setFilters, resetFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;