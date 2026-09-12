import { useEffect, useState } from 'react';
import { fetchAllCountries } from '@/api/countriesApi';
import { useCountrySummary } from '@/hooks/useCountryMapper';
import type { CountrySummary } from '@/types/dashboard';

export type CountriesStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface CountriesState {
  status: CountriesStatus;
  data: CountrySummary[];
  error: string | null;
}

export function useData(): CountriesState {
  const [state, setState] = useState<CountriesState>({
    status: 'idle',
    data: [],
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setState({ status: 'loading', data: [], error: null });
      try {
        const dtos = await fetchAllCountries(controller.signal);
        const summaries = dtos.map(useCountrySummary);

        if (summaries.length === 0) {
          setState({ status: 'empty', data: [], error: null });
        } else {
          setState({ status: 'success', data: summaries, error: null });
        }
      } catch (err) {
        if ((err as { name?: string })?.name === 'AbortError') {
          return;
        }
        setState({
          status: 'error',
          data: [],
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    };

    void load();
    return () => controller.abort();
  }, []);

  return state;
}
