import { useCallback, useMemo, useState } from 'react';
import { fetchCountries } from '@/api/countriesApi';
import { mapCountrySummary } from '@/lib/mapCountryMapper';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import type { CountryDto, CountryFilters, CountriesQueryResult } from '@/types';

export function useCountriesQuery(filters: CountryFilters): CountriesQueryResult {
  const { region, limit, unOnly, query } = filters;
  const debouncedQuery = useDebounce(query.trim(), 400);
  const [attempt, setAttempt] = useState(0);
  const request = useMemo<CountryFilters>(
    () => ({
      query: debouncedQuery,
      region,
      limit,
      unOnly,
    }),
    [debouncedQuery, region, limit, unOnly]
  );

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchCountries(request, signal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [request.query, request.region, request.limit, request.unOnly, attempt]
  );

  const { data, loading, error } = useFetch<CountryDto[]>(fetcher);
  const countries = useMemo(() => (data ?? []).map(mapCountrySummary), [data]);

  return {
    countries,
    loading,
    error,
    debouncing: debouncedQuery !== query.trim(),
    retry: () => setAttempt(curr => curr + 1),
  };
}