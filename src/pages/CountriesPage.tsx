import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error as ErrorView } from '@/components/ui/Error';
import { Empty } from '@/components/ui/Empty';
import { formatCompact } from '@/lib/format';
import { useCountriesQuery } from '@/hooks/useCountriesQuery';
import type { PageProps } from '@/types';

export function CountriesPage({ appliedFilters }: PageProps) {
  const { countries, loading, error, debouncing, retry } = useCountriesQuery(appliedFilters);
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
    <GlassCard
      title="Explore Countries"
      subtitle="Click on any card to view full country statistics and borders"
      actions={
        <div className="countries-page-actions">
          <span className={`chip ${updating ? 'updating-chip' : ''}`}>{updating ? 'updating…' : `${countries.length} countries`}</span>
        </div>
      }
    >
      <div className="countries-grid">
        {countries.map(country => (
          <Link key={`${country.code}::${country.name}`} to={`/country/${encodeURIComponent(country.code)}`} className="country-card">
            <div className="country-card__flag-box">
              <span className="country-card__flag-emoji" aria-hidden="true">
                {country.flagEmoji || '🏳️'}
              </span>
              <span className="country-card__code-badge">{country.code}</span>
            </div>
            <div className="country-card__content">
              <h3 className="country-card__name" title={country.name}>
                {country.name}
              </h3>
              <p className="country-card__region">
                {country.region} {country.capital ? `· ${country.capital}` : ''}
              </p>

              <div className="country-card__stats">
                <div className="country-card__stat">
                  <span className="country-card__stat-label">Population</span>
                  <span className="country-card__stat-value">{formatCompact(country.population)}</span>
                </div>

                {country.areaKm2 ? (
                  <div className="country-card__stat">
                    <span className="country-card__stat-label">Area</span>
                    <span className="country-card__stat-value">{formatCompact(country.areaKm2)} km²</span>
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </GlassCard>
  );
}