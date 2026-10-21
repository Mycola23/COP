import { useCallback, useMemo } from 'react';
import { fetchCountryByCode } from '@/api/countriesApi';
import { mapCountrySummary } from '@/lib/mapCountryMapper';
import { useFetch } from '@/hooks/useFetch';
import type { CountryDto, CountryDetailsResult } from '@/types';

export function useCountryDetails(code: string | undefined): CountryDetailsResult {
  const fetcher = useCallback(
    async (signal: AbortSignal): Promise<CountryDto | null> => {
      if (!code) return null;
      return fetchCountryByCode(code, signal);
    },
    [code]
  );

  const { data, loading, error } = useFetch<CountryDto | null>(fetcher);
  const country = useMemo(() => (data ? mapCountrySummary(data) : null), [data]);

  return { country, loading, error };
}