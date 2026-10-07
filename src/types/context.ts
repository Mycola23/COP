import type { CountrySummary, CountryFilters, Theme } from './dashboard';

export interface CountriesCtx {
  countries: CountrySummary[];
  loading: boolean;
  error: string | null;
  debouncing: boolean;
  retry: () => void;
  findByCode: (code: string) => CountrySummary | undefined;
}

export interface FiltersCtx {
  filters: CountryFilters;
  setFilters: (next: CountryFilters) => void;
  resetFilters: () => void;
}

export interface ThemeCtx {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}