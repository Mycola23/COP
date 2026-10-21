import type { Control, FieldErrors } from 'react-hook-form';
import type { CountryFilters, CountrySummary } from './dashboard';

export interface CountriesQueryResult {
  countries: CountrySummary[];
  loading: boolean;
  error: string | null;
  debouncing: boolean;
  retry: () => void;
}

export interface CountryDetailsResult {
  country: CountrySummary | null;
  loading: boolean;
  error: string | null;
}

export interface CountryFiltersForm {
  control: Control<CountryFilters>;
  errors: FieldErrors<CountryFilters>;
  appliedFilters: CountryFilters;
  isDirty: boolean;
  reset: () => void;
}

export interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}