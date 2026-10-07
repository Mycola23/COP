import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error as ErrorView } from '@/components/ui/Error';
import { Empty } from '@/components/ui/Empty';
import { FavoriteToggle } from '@/components/ui/FavoriteToggle';
import { formatCompact } from '@/lib/format';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectDisplayCountries,
  selectCountriesError,
  selectIsLoading,
  selectFilters,
  selectFavorites,
} from '@/store/selectors';
import { fetchCountriesThunk } from '@/store/slices/countriesSlice';
import type { CountrySummary } from '@/types';

const sortCountriesWithFavorites = (
  countries: readonly CountrySummary[],
  favorites: readonly string[]
): CountrySummary[] => {
  const copy = [...countries];
  const favSet = new Set(favorites.map(f => f.toUpperCase()));

  copy.sort((a, b) => {
    const isFavA = favSet.has(a.code.toUpperCase());
    const isFavB = favSet.has(b.code.toUpperCase());

    if (isFavA && !isFavB) return -1;
    if (!isFavA && isFavB) return 1;

    return a.name.localeCompare(b.name);
  });

  return copy;
};

export function CountriesPage() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectDisplayCountries);
  const favorites = useAppSelector(selectFavorites);
  const loading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectCountriesError);
  const filters = useAppSelector(selectFilters);

  const retry = () => dispatch(fetchCountriesThunk(filters));
  const sortedCountries = useMemo(
    () => sortCountriesWithFavorites(countries, favorites),
    [countries, favorites]
  );

  if (error !== null) {
    return (
      <GlassCard title="Countries" subtitle="request failed">
        <ErrorView message={error} onRetry={retry} />
      </GlassCard>
    );
  }

  if (loading && sortedCountries.length === 0) {
    return (
      <GlassCard title="Countries" subtitle="fetching live data">
        <Loader />
      </GlassCard>
    );
  }

  if (sortedCountries.length === 0) {
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
          <span className={`chip ${loading ? 'updating-chip' : ''}`}>
            {loading ? 'updating…' : `${sortedCountries.length} countries`}
          </span>
        </div>
      }
    >
      <div className="countries-grid">
        {sortedCountries.map(country => {
          const isFav = favorites.includes(country.code.toUpperCase());

          return (
            <Link
              key={`${country.code}::${country.name}`}
              to={`/country/${encodeURIComponent(country.code)}`}
              className={`country-card ${isFav ? 'country-card--favorite' : ''}`}
            >
              <div className="country-card__flag-box">
                <span className="country-card__flag-emoji" aria-hidden="true">
                  {country.flagEmoji || '🏳️'}
                </span>
                <span className="country-card__code-badge">{country.code}</span>
                <div className="country-card__fav" onClick={e => e.preventDefault()}>
                  <FavoriteToggle country={country} code={country.code} countryName={country.name} />
                </div>
              </div>
              <div className="country-card__content">
                <h3 className="country-card__name" title={country.name}>
                  {country.name}
                  {isFav ? <span className="fav-inline-badge">★ Favorite</span> : null}
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
          );
        })}
      </div>
    </GlassCard>
  );
}