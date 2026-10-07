import { DEFAULT_COUNTRY_FILTERS } from '@/constants';
import type { CountryFilters } from '@/types';

export const isDefaultFilters = (filters: CountryFilters): boolean =>
  filters.query === DEFAULT_COUNTRY_FILTERS.query &&
  filters.region === DEFAULT_COUNTRY_FILTERS.region &&
  filters.limit === DEFAULT_COUNTRY_FILTERS.limit &&
  filters.unOnly === DEFAULT_COUNTRY_FILTERS.unOnly;