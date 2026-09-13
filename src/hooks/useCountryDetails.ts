import { useMemo } from 'react';
import { fetchCountryByCode } from '@/api/countriesApi';
import { mapCountrySummary } from '@/hooks/useCountryMapper';
import { useFetch } from '@/hooks/useFetch';
import type { CountryDto } from '@/types/api';
import type { CountrySummary } from '@/types/dashboard';

export interface CountryDetailsResult {
  country: CountrySummary | null;
  loading: boolean;
  error: string | null;
}

export function useCountryDetails(code: string | undefined): CountryDetailsResult {
  const key = useMemo(() => `country:${code ?? ''}`, [code]);

  const { data, loading, error } = useFetch<CountryDto | null>(key, async signal => {
    if (!code) return null;
    return fetchCountryByCode(code, signal);
  });

  const country = useMemo(() => (data ? mapCountrySummary(data) : null), [data]);
  return { country, loading, error };
}
