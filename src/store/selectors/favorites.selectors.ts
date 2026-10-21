import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export const selectFavoritesItems = (state: RootState) => state.favorites.items;
export const selectFavoritesEntities = (state: RootState) => state.favorites.byCode;

export const selectIsFavorite = (code: string) =>
  createSelector([selectFavoritesItems], items => items.includes(code.toUpperCase()));