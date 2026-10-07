import { useCallback, useMemo, useState } from 'react';
import { fetchCountries } from '@/api/countriesApi';
import { mapCountrySummary } from '@/lib/mapCountryMapper';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import type { CountryDto } from '@/types/api';
import type { CountryFilters, CountrySummary } from '@/types/dashboard';

export interface CountriesQueryResult {
  countries: CountrySummary[];
  loading: boolean;
  error: string | null;
  debouncing: boolean;
  retry: () => void;
}

export function useCountriesQuery(filters: CountryFilters): CountriesQueryResult {
  const debouncedQuery = useDebounce(filters.query.trim(), 400);
  const [attempt, setAttempt] = useState(0);

  const request = useMemo<CountryFilters>(
    () => ({ ...filters, query: debouncedQuery }),
    [filters, debouncedQuery]
  );

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchCountries(request, signal),
    [request, attempt]
  );

  const { data, loading, error } = useFetch<CountryDto[]>(fetcher);
  const countries = useMemo(() => (data ?? []).map(mapCountrySummary), [data]);

  return {
    countries,
    loading,
    error,
    debouncing: debouncedQuery !== filters.query.trim(),
    retry: () => setAttempt(curr => curr + 1),
  };
}