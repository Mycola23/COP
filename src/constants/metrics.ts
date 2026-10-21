import type { Metric, MetricOption } from '@/types';

export const METRIC_LABELS: Record<Metric, string> = {
  population: 'population',
  area: 'land area',
  density: 'density',
};

export const METRIC_UNITS: Record<Metric, string> = {
  population: 'people',
  area: 'km²',
  density: 'people / km²',
};

export const METRICS: readonly MetricOption[] = [
  { id: 'population', label: 'Population' },
  { id: 'area', label: 'Area' },
  { id: 'density', label: 'Density' },
] as const;