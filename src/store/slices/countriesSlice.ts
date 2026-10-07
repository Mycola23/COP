import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCountries } from '@/api/countriesApi';
import { mapCountrySummary } from '@/lib/mapCountryMapper';
import type { CountryFilters, CountrySummary, CountriesState } from '@/types';

const initialState: CountriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCountriesThunk = createAsyncThunk<
  CountrySummary[],
  CountryFilters,
  { rejectValue: string }
>('countries/fetchCountries', async (filters, { rejectWithValue, signal }) => {
  try {
    const rawDtos = await fetchCountries(filters, signal);
    return rawDtos.map(mapCountrySummary);
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw err;
    }
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch countries');
  }
});

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCountriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountriesThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCountriesThunk.rejected, (state, action) => {
        if (action.error.name === 'AbortError') return;
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unknown error';
      });
  },
});

export const countriesReducer = countriesSlice.reducer;