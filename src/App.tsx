import { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { GlassCard } from '@/components/ui/GlassCard';
import { Counter } from '@/components/widgets/Counter';
import { FilteredCountryList } from '@/components/widgets/FilteredCountryList';
import { KpiCard } from '@/components/widgets/KpiCard';
import { MOCK_COUNTRY_DTOS } from '@/data/mockCountriesDto';
import { useCountrySummary } from '@/hooks/useCountryMapper';
import type { KpiData, Metric, Theme } from '@/types/dashboard';
import { buildKpis } from './lib/aggregations';

const COUNTRIES = MOCK_COUNTRY_DTOS.map(useCountrySummary);

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [metric, setMetric] = useState<Metric>('population');

  const kpis = useMemo(() => buildKpis(COUNTRIES), []);

  const toggleTheme = () => setTheme(current => (current === 'dark' ? 'light' : 'dark'));

  return (
    <DashboardLayout
      theme={theme}
      sidebar={<Sidebar />}
      header={<Header metric={metric} onMetricChange={setMetric} isDark={theme === 'dark'} onToggleTheme={toggleTheme} />}
    >
      <section className="grid-kpis" aria-label="Key metrics">
        {kpis.map((kpi: KpiData) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      <section className="grid-bottom">
        <GlassCard title="Quick set size" subtitle="useState + event handling demo">
          <Counter label="Countries in quick preview" initial={4} min={1} max={COUNTRIES.length}>
            {count => (
              <ul className="preview-list">
                {COUNTRIES.slice(0, count).map(country => (
                  <li key={country.code} className="preview-list__item">
                    <span aria-hidden="true">{country.flagEmoji}</span>
                    <span>{country.name}</span>
                    <span className="preview-list__muted">{country.region}</span>
                  </li>
                ))}
              </ul>
            )}
          </Counter>
        </GlassCard>
        <GlassCard title="Country explorer" subtitle="controlled select + derived list">
          <FilteredCountryList items={COUNTRIES} />
        </GlassCard>
      </section>
    </DashboardLayout>
  );
}
