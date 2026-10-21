import { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Empty } from '@/components/ui/Empty';
import { Error as ErrorView } from '@/components/ui/Error';
import { Loader } from '@/components/ui/Loader';
import { CountriesTable } from '@/components/widgets/CountriesTable';
import { KpiCard } from '@/components/widgets/KpiCard';
import { MetricBarChart } from '@/components/widgets/charts/MetricBarChart';
import { RegionDoughnutChart } from '@/components/widgets/charts/RegionDoughnutChart';
import { useCountries } from '@/context/CountriesContext';
import { buildKpis, buildRegionSeries, buildTopSeries, METRIC_LABELS } from '@/lib/aggregations';
import type { Metric } from '@/types/dashboard';

const METRICS: { id: Metric; label: string }[] = [
  { id: 'population', label: 'Population' },
  { id: 'area', label: 'Area' },
  { id: 'density', label: 'Density' },
];

export function MainPage() {
  const { countries, loading, error, debouncing, retry } = useCountries();
  const [metric, setMetric] = useState<Metric>('population');

  const kpis = useMemo(() => buildKpis(countries), [countries]);
  const topSeries = useMemo(() => buildTopSeries(countries, metric, 8), [countries, metric]);
  const regionSeries = useMemo(() => buildRegionSeries(countries), [countries]);

  const updating = loading || debouncing;

  if (error !== null) {
    return (
      <GlassCard title="Countries" subtitle="request failed">
        <ErrorView message={error} onRetry={retry} />
      </GlassCard>
    );
  }
  if (loading && countries.length === 0) {
    return (
      <GlassCard title="Countries" subtitle="fetching live data">
        <Loader />
      </GlassCard>
    );
  }
  if (countries.length === 0) {
    return (
      <GlassCard title="Countries" subtitle="nothing matches the filters">
        <Empty />
      </GlassCard>
    );
  }

  return (
    <>
      <section className="grid-kpis" aria-label="Key metrics">
        {kpis.map(kpi => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      <section className="grid-charts">
        <GlassCard
          title={`Top countries by ${METRIC_LABELS[metric]}`}
          subtitle="current selection"
          actions={
            <div className="header__tabs" role="tablist" aria-label="Metric">
              {METRICS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={metric === m.id}
                  className={`header__tab  ${metric === m.id ? 'is-active' : ''}`}
                  onClick={() => setMetric(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          }
        >
          <MetricBarChart series={topSeries} />
        </GlassCard>
        <GlassCard title="Countries by region" subtitle="current selection">
          <RegionDoughnutChart series={regionSeries} />
        </GlassCard>
      </section>

      <section className="grid-table">
        <GlassCard
          title="Countries directory"
          subtitle="click a row to open details"
          actions={<span className={`chip ${updating ? 'updating-chip' : ''}`}>{updating ? 'updating…' : `${countries.length} rows`}</span>}
        >
          <CountriesTable countries={countries} />
        </GlassCard>
      </section>
    </>
  );
}
