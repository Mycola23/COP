import { use } from 'react';
import { fetchAllCountries } from '@/api/countriesApi';
import { mapCountrySummary } from '@/hooks/useCountryMapper';
import type { CountrySummary } from '@/types/dashboard';

const countriesPromise: Promise<CountrySummary[]> = fetchAllCountries().then(dtos => dtos.map(mapCountrySummary));

export function useCountriesSuspense(): CountrySummary[] {
  return use(countriesPromise);
}
