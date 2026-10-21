import { useMemo, useState } from 'react';
import { Card, Badge, StateView, Button } from '@/design-system';
import { CountriesTable } from '@/components/widgets/CountriesTable';
import { KpiCard } from '@/components/widgets/KpiCard';
import { MetricBarChart } from '@/components/widgets/charts/MetricBarChart';
import { RegionDoughnutChart } from '@/components/widgets/charts/RegionDoughnutChart';
import { InteractiveMetricChart } from '@/components/widgets/charts/InteractiveMetricChart';
import { buildKpis, buildRegionSeries, buildTopSeries } from '@/lib/aggregations';
import { METRIC_LABELS, METRICS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectDisplayCountries, selectCountriesError, selectCountriesIsLoading, selectFilters } from '@/store/selectors';
import { fetchCountriesThunk } from '@/store/slices/countriesSlice';
import type { Metric } from '@/types';

export function MainPage() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectDisplayCountries);
  const loading = useAppSelector(selectCountriesIsLoading);
  const error = useAppSelector(selectCountriesError);
  const filters = useAppSelector(selectFilters);

  const [metric, setMetric] = useState<Metric>('population');

  const kpis = useMemo(() => buildKpis(countries), [countries]);
  const topSeries = useMemo(() => buildTopSeries(countries, metric, 8), [countries, metric]);
  const regionSeries = useMemo(() => buildRegionSeries(countries), [countries]);

  const retry = () => dispatch(fetchCountriesThunk(filters));

  if (error !== null) {
    return (
      <Card title="Countries" subtitle="request failed">
        <StateView type="error" title="Failed to load countries" subtitle={error} actionText="Retry" onAction={retry} />
      </Card>
    );
  }

  if (loading && countries.length === 0) {
    return (
      <Card title="Countries" subtitle="fetching live data">
        <StateView type="loading" title="Loading countries live data..." />
      </Card>
    );
  }

  if (countries.length === 0) {
    return (
      <Card title="Countries" subtitle="nothing matches the filters">
        <StateView type="empty" title="No countries returned" subtitle="The current filter selection yielded 0 results." />
      </Card>
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
        <Card
          title={`Top countries by ${METRIC_LABELS[metric]}`}
          subtitle="Overview selection"
          actions={
            <div className="header__tabs" role="tablist" aria-label="Metric">
              {METRICS.map(m => (
                <Button
                  key={m.id}
                  variant="ghost"
                  size="sm"
                  isActive={metric === m.id}
                  className="header__tab"
                  onClick={() => setMetric(m.id)}
                >
                  {m.label}
                </Button>
              ))}
            </div>
          }
        >
          <MetricBarChart series={topSeries} />
        </Card>

        <Card title="Countries by region" subtitle="Distribution">
          <RegionDoughnutChart series={regionSeries} />
        </Card>
      </section>

      <section className="grid-interactive">
        <Card
          title={`Interactive Dynamics (${METRIC_LABELS[metric]})`}
          subtitle="Switch between Bar & Line view with highlighted favorites"
        >
          <InteractiveMetricChart countries={countries} metric={metric} limit={10} />
        </Card>
      </section>

      <section className="grid-table">
        <Card
          title="Countries directory"
          subtitle="Click a row to open details or star to favorite"
          actions={
            <Badge className={loading ? 'updating-chip' : ''}>
              {loading ? 'updating…' : `${countries.length} rows`}
            </Badge>
          }
        >
          <CountriesTable countries={countries} />
        </Card>
      </section>
    </>
  );
}