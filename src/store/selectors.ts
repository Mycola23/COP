import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { CountrySummary } from '@/types';

export const selectFilters = (state: RootState) => state.filters;
export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectFavoriteEntities = (state: RootState) => state.favorites.byCode;
export const selectCountries = (state: RootState) => state.countries.items;
export const selectIsLoading = (state: RootState) => state.countries.loading;
export const selectCountriesError = (state: RootState) => state.countries.error;

export const selectChartType = (state: RootState) => state.ui.chartType;
export const selectSelectedMetric = (state: RootState) => state.ui.selectedMetric;

export const selectIsFavorite = (code: string) =>
  createSelector([selectFavorites], favorites => favorites.includes(code.toUpperCase()));

export const selectDisplayCountries = createSelector(
  [selectCountries, selectFavoriteEntities],
  (countries, favoriteEntities): CountrySummary[] => {
    const presentCodes = new Set(countries.map(c => c.code.toUpperCase()));
    const missingFavorites: CountrySummary[] = [];

    for (const code in favoriteEntities) {
      if (!presentCodes.has(code.toUpperCase())) {
        missingFavorites.push(favoriteEntities[code]);
      }
    }

    if (missingFavorites.length === 0) {
      return countries;
    }

    return [...missingFavorites, ...countries];
  }
);