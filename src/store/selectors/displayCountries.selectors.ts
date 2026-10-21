import { createSelector } from '@reduxjs/toolkit';
import type { CountrySummary } from '@/types';
import { selectCountriesItems } from './countries.selectors';
import { selectFavoritesEntities } from './favorites.selectors';

export const selectDisplayCountries = createSelector(
  [selectCountriesItems, selectFavoritesEntities],
  (countries, favoriteEntities): CountrySummary[] => {
    const presentCodes = new Set(countries.map(c => c.code.toUpperCase()));
    const missingFavorites: CountrySummary[] = [];

    for (const code in favoriteEntities) {
      if (!presentCodes.has(code.toUpperCase())) {
        missingFavorites.push(favoriteEntities[code]);
      }
    }

    return missingFavorites.length === 0
      ? countries
      : [...missingFavorites, ...countries];
  }
);