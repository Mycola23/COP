import type { RootState } from '../index';

export const selectCountriesItems = (state: RootState) => state.countries.items;
export const selectCountriesIsLoading = (state: RootState) => state.countries.loading;
export const selectCountriesError = (state: RootState) => state.countries.error;