import type { CountryFilters } from '@/types';

export const DEFAULT_COUNTRY_FILTERS: CountryFilters = {
  query: '',
  region: 'all',
  limit: 0,
  unOnly: false,
};

export const REGION_OPTIONS = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;
export const LIMIT_OPTIONS = [10, 25, 50, 100, 0] as const;