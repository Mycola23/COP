import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error as ErrorView } from '@/components/ui/Error';
import { Empty } from '@/components/ui/Empty';
import { useCountries } from '@/context/CountriesContext';
import { formatCompact } from '@/lib/format';

export function CountriesPage() {
  const { countries, loading, error, debouncing, retry } = useCountries();
  const [search, setSearch] = useState('');

  const updating = loading || debouncing;

  // Локальний швидкий пошук за назвою або столицею
  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(c => c.name.toLowerCase().includes(q) || (c.capital && c.capital.toLowerCase().includes(q)));
  }, [countries, search]);

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
          <input
            type="search"
            placeholder="Quick search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="filter-form__input countries-search-input"
          />
          <span className={`chip ${updating ? 'updating-chip' : ''}`}>{updating ? 'updating…' : `${filteredCountries.length} countries`}</span>
        </div>
      }
    >
      {filteredCountries.length === 0 ? (
        <div className="state state--empty">
          <span className="state__icon" aria-hidden="true">
            🔍
          </span>
          <p className="state__title">No countries found</p>
          <p className="state__hint">No results matching “{search}”. Try another keyword.</p>
        </div>
      ) : (
        <div className="countries-grid">
          {filteredCountries.map(country => {
            // Безпечно перевіряємо посилання на зображення прапора або емодзі
            const flagUrl = 'flagUrl' in country ? (country as { flagUrl?: string }).flagUrl : undefined;

            return (
              <Link key={`${country.code}::${country.name}`} to={`/country/${encodeURIComponent(country.code)}`} className="country-card">
                {/* Блок прапора (зображення або великий емодзі) */}
                <div className="country-card__flag-box">
                  {flagUrl ? (
                    <img src={flagUrl} alt={`${country.name} flag`} className="country-card__flag-img" loading="lazy" />
                  ) : (
                    <span className="country-card__flag-emoji" aria-hidden="true">
                      {country.flagEmoji || '🏳️'}
                    </span>
                  )}
                  <span className="country-card__code-badge">{country.code}</span>
                </div>

                {/* Коротка інформація */}
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

                    {'areaKm2' in country && country.areaKm2 ? (
                      <div className="country-card__stat">
                        <span className="country-card__stat-label">Area</span>
                        <span className="country-card__stat-value">{formatCompact(country.areaKm2)} km²</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
