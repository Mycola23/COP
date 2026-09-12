import { Suspense } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CountriesTable } from '@/components/widgets/CountriesTable';
import { useCountriesSuspense } from '@/queries/countriesQuery';

const CountriesTableSuspense = () => {
  const countries = useCountriesSuspense();
  if (countries.length === 0) {
    return <p className="state__hint">No countries returned.</p>;
  }
  return <CountriesTable countries={countries} />;
};

const CountriesFallback = () => (
  <div className="state state--loading" aria-busy="true">
    <div className="spinner" aria-hidden="true" />
    <p className="state__title">Loading countries…</p>
  </div>
);

export const CountriesDashboardSuspense = () => (
  <GlassCard title="Countries" subtitle="Suspense + use()">
    <Suspense fallback={<CountriesFallback />}>
      <CountriesTableSuspense />
    </Suspense>
  </GlassCard>
);
