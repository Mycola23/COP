/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useCountriesQuery } from '@/hooks/useCountriesQuery';
import { useFilters } from './FiltersContext';
import type { CountrySummary } from '@/types/dashboard';

interface CountriesCtx {
  countries: CountrySummary[];
  loading: boolean;
  error: string | null;
  debouncing: boolean;
  retry: () => void;
  findByCode: (code: string) => CountrySummary | undefined;
}

const CountriesContext = createContext<CountriesCtx | null>(null);

export function CountriesProvider({ children }: { children: ReactNode }) {
  const { filters } = useFilters();
  const query = useCountriesQuery(filters);

  const findByCode = useMemo(
    () =>
      (code: string): CountrySummary | undefined => {
        const needle = code.toLowerCase();
        return query.countries.find(c => c.code.toLowerCase() === needle || c.name.toLowerCase() === needle);
      },
    [query.countries],
  );

  const value = useMemo<CountriesCtx>(
    () => ({
      countries: query.countries,
      loading: query.loading,
      error: query.error,
      debouncing: query.debouncing,
      retry: query.retry,
      findByCode,
    }),
    [query, findByCode],
  );

  return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>;
}

export function useCountries(): CountriesCtx {
  const ctx = useContext(CountriesContext);
  if (!ctx) throw new Error('useCountries must be used within <CountriesProvider> Only in this way🚔)');
  return ctx;
}
