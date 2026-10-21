import { useMemo } from 'react';
import { Card, Badge, StateView, CountryCard } from '@/design-system';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectDisplayCountries,
  selectCountriesError,
  selectCountriesIsLoading,
  selectFilters,
  selectFavoritesItems,
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
  const favorites = useAppSelector(selectFavoritesItems);
  const loading = useAppSelector(selectCountriesIsLoading);
  const error = useAppSelector(selectCountriesError);
  const filters = useAppSelector(selectFilters);

  const retry = () => dispatch(fetchCountriesThunk(filters));

  const sortedCountries = useMemo(
    () => sortCountriesWithFavorites(countries, favorites),
    [countries, favorites]
  );

  if (error !== null) {
    return (
      <Card title="Countries" subtitle="request failed">
        <StateView type="error" title="Failed to load countries" subtitle={error} actionText="Retry" onAction={retry} />
      </Card>
    );
  }

  if (loading && sortedCountries.length === 0) {
    return (
      <Card title="Countries" subtitle="fetching live data">
        <StateView type="loading" title="Loading countries data..." />
      </Card>
    );
  }

  if (sortedCountries.length === 0) {
    return (
      <Card title="Countries" subtitle="nothing matches the filters">
        <StateView type="empty" title="No countries returned" subtitle="The API responded with an empty dataset" />
      </Card>
    );
  }

  return (
    <Card
      title="Explore Countries"
      subtitle="Click on any card to view full country statistics and borders"
      actions={
        <div className="countries-page-actions">
          <Badge className={loading ? 'updating-chip' : ''}>
            {loading ? 'updating…' : `${sortedCountries.length} countries`}
          </Badge>
        </div>
      }
    >
      <div className="countries-grid">
        {sortedCountries.map(country => (
          <CountryCard
            key={`${country.code}::${country.name}`}
            country={country}
            isFavorite={favorites.includes(country.code.toUpperCase())}
          />
        ))}
      </div>
    </Card>
  );
}