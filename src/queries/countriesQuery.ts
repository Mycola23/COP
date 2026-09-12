import { use } from 'react';
import { fetchAllCountries } from '@/api/countriesApi';
import { useCountrySummary } from '@/hooks/useCountryMapper';
import type { CountrySummary } from '@/types/dashboard';

const countriesPromise: Promise<CountrySummary[]> = fetchAllCountries().then(dtos => dtos.map(useCountrySummary));

export function useCountriesSuspense(): CountrySummary[] {
  return use(countriesPromise);
}
