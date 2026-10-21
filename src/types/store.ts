import type { CountrySummary, ChartType, Metric } from './dashboard';

export interface FavoritesState {
  items: string[];
  byCode: Record<string, CountrySummary>;
}

export interface CountriesState {
  items: CountrySummary[];
  loading: boolean;
  error: string | null;
}

export interface UiState {
  chartType: ChartType;
  selectedMetric: Metric;
}