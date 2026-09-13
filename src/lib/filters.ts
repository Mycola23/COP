import type { CountryFilters } from '@/types/dashboard';

export const DEFAULT_COUNTRY_FILTERS: CountryFilters = {
  query: '',
  region: 'all',
  limit: 0,
  unOnly: false,
};

export const REGION_OPTIONS = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;
export const LIMIT_OPTIONS = [10, 25, 50, 100, 0] as const;

export const isDefaultFilters = (filters: CountryFilters): boolean =>
  filters.query === DEFAULT_COUNTRY_FILTERS.query &&
  filters.region === DEFAULT_COUNTRY_FILTERS.region &&
  filters.limit === DEFAULT_COUNTRY_FILTERS.limit &&
  filters.unOnly === DEFAULT_COUNTRY_FILTERS.unOnly;
