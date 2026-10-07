import { useMemo, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Empty } from '@/components/ui/Empty';
import { Error as ErrorView } from '@/components/ui/Error';
import { Loader } from '@/components/ui/Loader';
import { CountriesTable } from '@/components/widgets/CountriesTable';
import { KpiCard } from '@/components/widgets/KpiCard';
import { MetricBarChart } from '@/components/widgets/charts/MetricBarChart';
import { RegionDoughnutChart } from '@/components/widgets/charts/RegionDoughnutChart';
import { InteractiveMetricChart } from '@/components/widgets/charts/InteractiveMetricChart';
import { buildKpis, buildRegionSeries, buildTopSeries } from '@/lib/aggregations';
import { METRIC_LABELS, METRICS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectDisplayCountries, selectCountriesError, selectIsLoading, selectFilters } from '@/store/selectors';
import { fetchCountriesThunk } from '@/store/slices/countriesSlice';
import type { Metric } from '@/types';

export function MainPage() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectDisplayCountries);
  const loading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectCountriesError);
  const filters = useAppSelector(selectFilters);

  const [metric, setMetric] = useState<Metric>('population');

  const kpis = useMemo(() => buildKpis(countries), [countries]);
  const topSeries = useMemo(() => buildTopSeries(countries, metric, 8), [countries, metric]);
  const regionSeries = useMemo(() => buildRegionSeries(countries), [countries]);

  const retry = () => dispatch(fetchCountriesThunk(filters));

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
          subtitle="Overview selection"
          actions={
            <div className="header__tabs" role="tablist" aria-label="Metric">
              {METRICS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={metric === m.id}
                  className={`header__tab ${metric === m.id ? 'is-active' : ''}`}
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

        <GlassCard title="Countries by region" subtitle="Distribution">
          <RegionDoughnutChart series={regionSeries} />
        </GlassCard>
      </section>

      <section className="grid-interactive">
        <GlassCard
          title={`Interactive Dynamics (${METRIC_LABELS[metric]})`}
          subtitle="Switch between Bar & Line view with highlighted favorites"
        >
          <InteractiveMetricChart countries={countries} metric={metric} limit={10} />
        </GlassCard>
      </section>

      <section className="grid-table">
        <GlassCard
          title="Countries directory"
          subtitle="Click a row to open details or star to favorite"
          actions={
            <span className={`chip ${loading ? 'updating-chip' : ''}`}>
              {loading ? 'updating…' : `${countries.length} rows`}
            </span>
          }
        >
          <CountriesTable countries={countries} />
        </GlassCard>
      </section>
    </>
  );
}