/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CountryFilters } from '@/types/dashboard';
import { DEFAULT_COUNTRY_FILTERS } from '@/lib/filters';

interface FiltersCtx {
  filters: CountryFilters;
  setFilters: (next: CountryFilters) => void;
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersCtx | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<CountryFilters>(DEFAULT_COUNTRY_FILTERS);
  const resetFilters = () => setFilters(DEFAULT_COUNTRY_FILTERS);
  return <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>{children}</FiltersContext.Provider>;
}

export function useFilters(): FiltersCtx {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFilters must be used within <FiltersProvider> Only in this way🚔)');
  return ctx;
}
