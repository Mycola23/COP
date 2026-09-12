import { formatCompact } from '@/lib/format';
import type { CountrySummary, KpiData, Metric } from '@/types/dashboard';

export const METRIC_LABELS: Record<Metric, string> = {
  population: 'population',
  area: 'land area',
  density: 'density',
};

export const metricValue = (country: CountrySummary, metric: Metric): number => {
  if (metric === 'population') return country.population;
  if (metric === 'area') return country.areaKm2;
  return country.population / country.areaKm2;
};

const MOCK_DELTAS = { tracked: 8.3, population: 3.18, density: -1.42, un: 2.0 } as const;

export const buildKpis = (countries: readonly CountrySummary[]): KpiData[] => {
  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
  const totalArea = countries.reduce((sum, c) => sum + c.areaKm2, 0);
  const unMembers = countries.filter(c => c.isUnMember).length;
  const avgDensity = totalPopulation / totalArea;
  const unShare = (unMembers / countries.length) * 100;

  return [
    {
      id: 'tracked',
      title: 'Countries tracked',
      value: String(countries.length),
      deltaPercent: MOCK_DELTAS.tracked,
      deltaAbsolute: '+1 vs PY',
      hint: 'entities in current snapshot',
    },
    {
      id: 'population',
      title: 'Total population',
      value: formatCompact(totalPopulation),
      deltaPercent: MOCK_DELTAS.population,
      deltaAbsolute: `${formatCompact(Math.round(totalPopulation * 0.0318))} vs PY`,
      hint: 'sum across tracked countries',
    },
    {
      id: 'density',
      title: 'Avg density',
      value: `${avgDensity.toFixed(1)} /km²`,
      deltaPercent: MOCK_DELTAS.density,
      deltaAbsolute: '-0.2 vs PY',
      hint: 'population ÷ land area',
    },
    {
      id: 'un',
      title: 'UN members',
      value: `${unShare.toFixed(0)}%`,
      deltaPercent: MOCK_DELTAS.un,
      deltaAbsolute: `${unMembers}/${countries.length}`,
      hint: 'classification.un_member share',
    },
  ];
};
