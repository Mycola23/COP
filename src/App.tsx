import { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { KpiCard } from '@/components/widgets/KpiCard';
import { MetricBarChart } from '@/components/widgets/charts/MetricBarChart';
import { RegionDoughnutChart } from '@/components/widgets/charts/RegionDoughnutChart';
import { CountriesTable } from '@/components/widgets/CountriesTable';
import { Loader } from '@/components/ui/Loader';
import { Error } from '@/components/ui/Error';
import { Empty } from '@/components/ui/Empty';
import { CountryFilterForm } from '@/components/widgets/CountryFilterForm';
import { DEFAULT_COUNTRY_FILTERS } from '@/lib/filters';
import { buildKpis, buildRegionSeries, buildTopSeries, METRIC_LABELS } from '@/lib/aggregations';
import type { CountryFilters, Metric, Theme } from '@/types/dashboard';
import { useCountriesQuery } from './hooks/useCountriesQuery';

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [metric, setMetric] = useState<Metric>('population');
  const [filters, setFilters] = useState<CountryFilters>(DEFAULT_COUNTRY_FILTERS);

  const { countries, loading, error, debouncing, retry } = useCountriesQuery(filters);

  const kpis = useMemo(() => buildKpis(countries), [countries]);
  const topSeries = useMemo(() => buildTopSeries(countries, metric, 8), [countries, metric]);
  const regionSeries = useMemo(() => buildRegionSeries(countries), [countries]);

  const toggleTheme = () => setTheme(current => (current === 'dark' ? 'light' : 'dark'));
  const resetFilters = () => setFilters(DEFAULT_COUNTRY_FILTERS);

  const updating = loading || debouncing;

  const renderContent = () => {
    if (error !== null) {
      return (
        <GlassCard title="Countries" subtitle="request failed">
          <Error message={error} onRetry={retry} />
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
            actions={<span className="chip">{topSeries.unit}</span>}
          >
            <MetricBarChart series={topSeries} theme={theme} />
          </GlassCard>
          <GlassCard title="Countries by region" subtitle="current selection">
            <RegionDoughnutChart series={regionSeries} theme={theme} />
          </GlassCard>
        </section>

        <section className="grid-table">
          <GlassCard
            title="Countries directory"
            subtitle="live · filterable · sortable"
            actions={<span className={`chip ${updating ? 'updating-chip' : ''}`}>{updating ? 'updating…' : `${countries.length} rows`}</span>}
          >
            <CountriesTable countries={countries} />
          </GlassCard>
        </section>
      </>
    );
  };

  return (
    <DashboardLayout
      theme={theme}
      sidebar={
        <Sidebar>
          <CountryFilterForm value={filters} onChange={setFilters} onReset={resetFilters} />
        </Sidebar>
      }
      header={<Header metric={metric} onMetricChange={setMetric} isDark={theme === 'dark'} onToggleTheme={toggleTheme} />}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
