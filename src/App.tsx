import { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FilteredCountryList } from '@/components/widgets/FilteredCountryList';
import { KpiCard } from '@/components/widgets/KpiCard';
import { MetricBarChart } from '@/components/widgets/charts/MetricBarChart';
import { RegionDoughnutChart } from '@/components/widgets/charts/RegionDoughnutChart';
import { CountriesTable } from '@/components/widgets/CountriesTable';
import { Loader } from '@/components/ui/Loader';
import { Error } from '@/components/ui/Error';
import { Empty } from '@/components/ui/Empty';

import { useData } from '@/hooks/useData';
import { buildKpis, buildRegionSeries, buildTopSeries, METRIC_LABELS } from '@/lib/aggregations';
import type { Metric, Theme } from '@/types/dashboard';

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [metric, setMetric] = useState<Metric>('population');

  const { status, data: countries, error } = useData();

  const kpis = useMemo(() => buildKpis(countries), [countries]);
  const topSeries = useMemo(() => buildTopSeries(countries, metric, 8), [countries, metric]);
  const regionSeries = useMemo(() => buildRegionSeries(countries), [countries]);

  const toggleTheme = () => setTheme(current => (current === 'dark' ? 'light' : 'dark'));
  const retry = () => window.location.reload();

  const renderDataContent = () => {
    if (status === 'idle' || status === 'loading') {
      return (
        <GlassCard title="Global Dashboard" subtitle="fetching live data from restcountries.com">
          <Loader />
        </GlassCard>
      );
    }

    if (status === 'error') {
      return (
        <GlassCard title="Global Dashboard" subtitle="request failed">
          <Error message={error ?? 'Unknown error'} onRetry={retry} />
        </GlassCard>
      );
    }

    if (status === 'empty') {
      return (
        <GlassCard title="Global Dashboard" subtitle="no records">
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
            subtitle="live data comparison"
            actions={<span className="chip">{topSeries.unit}</span>}
          >
            <MetricBarChart series={topSeries} theme={theme} />
          </GlassCard>
          <GlassCard title="Countries by region" subtitle="live distribution">
            <RegionDoughnutChart series={regionSeries} theme={theme} />
          </GlassCard>
        </section>

        <section className="grid-table">
          <GlassCard title="Countries Directory" subtitle="sortable live data table">
            <CountriesTable countries={countries} />
          </GlassCard>
        </section>

        <section className="grid-explorer">
          <GlassCard title="Country explorer" subtitle="controlled select + derived filtered list">
            <FilteredCountryList items={countries} />
          </GlassCard>
        </section>
      </>
    );
  };

  return (
    <DashboardLayout
      theme={theme}
      sidebar={<Sidebar />}
      header={<Header metric={metric} onMetricChange={setMetric} isDark={theme === 'dark'} onToggleTheme={toggleTheme} />}
    >
      {renderDataContent()}
    </DashboardLayout>
  );
}
