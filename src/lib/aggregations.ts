import { formatCompact, round } from '@/lib/format';
import type { ChartSeries, CountrySummary, KpiData, Metric } from '@/types/dashboard';

export const METRIC_LABELS: Record<Metric, string> = {
  population: 'population',
  area: 'land area',
  density: 'density',
};

const METRIC_UNITS: Record<Metric, string> = {
  population: 'people',
  area: 'km²',
  density: 'people / km²',
};

export const metricValue = (country: CountrySummary, metric: Metric): number => {
  if (metric === 'population') return country.population;
  if (metric === 'area') return country.areaKm2;
  return country.population / country.areaKm2;
};

export const buildTopSeries = (countries: readonly CountrySummary[], metric: Metric, limit: number): ChartSeries => {
  const top = [...countries].sort((a, b) => metricValue(b, metric) - metricValue(a, metric)).slice(0, limit);
  return {
    labels: top.map(c => c.name),
    values: top.map(c => Number(metricValue(c, metric).toFixed(1))),
    unit: METRIC_UNITS[metric],
  };
};

export const buildRegionSeries = (countries: readonly CountrySummary[]): ChartSeries => {
  const counts = new Map<string, number>();
  for (const country of countries) counts.set(country.region, (counts.get(country.region) ?? 0) + 1);
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return { labels: sorted.map(([region]) => region), values: sorted.map(([, count]) => count), unit: 'countries' };
};

const medianOf = (values: readonly number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const buildKpis = (countries: readonly CountrySummary[]): KpiData[] => {
  const total = countries.length;
  if (total === 0) return [];

  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
  const totalArea = countries.reduce((sum, c) => sum + c.areaKm2, 0);
  const unMembers = countries.filter((c) => c.isUnMember).length;
  const avgDensity = totalArea > 0 ? totalPopulation / totalArea : 0;

  const regionCounts = new Map<string, number>();
  for (const c of countries) regionCounts.set(c.region, (regionCounts.get(c.region) ?? 0) + 1);
  const [topRegion, topRegionCount] = [...regionCounts.entries()].reduce((a, b) => (b[1] > a[1] ? b : a));
  const topRegionShare = (topRegionCount / total) * 100;


  const topCountryByPopulation = countries.reduce((max, c) => (c.population > max.population ? c : max), countries[0]);
  const topShare = totalPopulation > 0 ? (topCountryByPopulation.population / totalPopulation) * 100 : 0;

  const densities = countries
    .filter((c) => c.areaKm2 > 0)
    .map((c) => c.population / c.areaKm2);
  const medianDensity = medianOf(densities);
  const skew = avgDensity > 0 ? ((medianDensity - avgDensity) / avgDensity) * 100 : 0;

  const nonUn = total - unMembers;
  const nonUnShare = (nonUn / total) * 100;
  return [
    {
      id: 'tracked',
      title: 'Countries tracked',
       value: String(total),
      deltaPercent: round(topRegionShare),
      deltaAbsolute: `${topRegion}: ${topRegionCount} of ${total}`,
      hint: 'largest region share of the selection',
    },
    {
      id: 'population',
      title: 'Total population',
      value: formatCompact(totalPopulation),
      deltaPercent: round(topShare),
      deltaAbsolute: `${topCountryByPopulation.name}: ${formatCompact(topCountryByPopulation.population)} of ${formatCompact(totalPopulation)}`,
      hint: 'top-1 country concentration',
    },
    {
      id: 'density',
      title: 'Avg density',
      value: `${avgDensity.toFixed(1)} /km²`,
      deltaPercent: round(skew),
      deltaAbsolute: `median ${formatCompact(medianDensity)} vs mean ${formatCompact(avgDensity)} /km²`,
      hint: 'median-vs-mean skew of per-country density',
    },
    {
      id: 'un',
      title: 'UN members',
      value: `${((unMembers / total) * 100).toFixed(0)}%`,
      deltaPercent: -round(nonUnShare),
      deltaAbsolute: `${nonUn} of ${total} are not UN members`,
      hint: 'non-member gap in the selection',
    },
  ];
};
