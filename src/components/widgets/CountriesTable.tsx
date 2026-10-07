import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCompact } from '@/lib/format';
import { TABLE_COLUMNS } from '@/constants';
import { FavoriteToggle } from '@/components/ui/FavoriteToggle';
import { useAppSelector } from '@/store/hooks';
import { selectFavorites } from '@/store/selectors';
import type { CountriesTableProps, CountrySummary, SortConfig, SortField } from '@/types';

const getCellValue = (country: CountrySummary, field: SortField): string | number => {
  switch (field) {
    case 'name':
      return country.name;
    case 'capital':
      return country.capital;
    case 'region':
      return country.region;
    case 'population':
      return country.population;
    case 'area':
      return country.areaKm2;
    case 'density':
      return country.population / country.areaKm2;
  }
};

const compareValues = (a: string | number, b: string | number): number =>
  typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b));

const sortCountries = (
  source: readonly CountrySummary[],
  { field, direction }: SortConfig,
  favorites: readonly string[]
): CountrySummary[] => {
  const copy = [...source];
  const sign = direction === 'asc' ? 1 : -1;
  const favSet = new Set(favorites.map(f => f.toUpperCase()));

  copy.sort((a, b) => {
    const isFavA = favSet.has(a.code.toUpperCase());
    const isFavB = favSet.has(b.code.toUpperCase());

    if (isFavA && !isFavB) return -1;
    if (!isFavA && isFavB) return 1;

    const primary = compareValues(getCellValue(a, field), getCellValue(b, field)) * sign;
    if (primary !== 0) return primary;
    return a.name.localeCompare(b.name);
  });

  return copy;
};

const density = (c: CountrySummary) => c.population / c.areaKm2;
const formatArea = (km2: number) => `${formatCompact(km2)} km²`;
const formatDensity = (d: number) => (!isFinite(d) || d === 0 ? '—' : `${formatCompact(d)} /km²`);

const SortIndicator = ({ field, current }: { field: SortField; current: SortConfig }) => {
  if (current.field !== field) return <span className="sort-arrow sort-arrow--idle">⇅</span>;
  return <span className="sort-arrow">{current.direction === 'asc' ? '▲' : '▼'}</span>;
};

export const CountriesTable = ({ countries }: CountriesTableProps) => {
  const [sort, setSort] = useState<SortConfig>({ field: 'population', direction: 'desc' });
  const navigate = useNavigate();
  const favorites = useAppSelector(selectFavorites);

  const openCountry = (code: string) => {
    navigate(`/country/${encodeURIComponent(code)}`);
  };

  const toggle = (field: SortField) =>
    setSort(prev =>
      prev.field === field
        ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { field, direction: field === 'name' || field === 'capital' || field === 'region' ? 'asc' : 'desc' }
    );

  const sorted = useMemo(() => sortCountries(countries, sort, favorites), [countries, sort, favorites]);

  return (
    <div className="table-wrap">
      <table className="countries-table" aria-label="Countries">
        <thead>
          <tr>
            <th scope="col" className="col-fav" aria-label="Favorite">★</th>
            <th scope="col" className="col-flag">Flag</th>
            {TABLE_COLUMNS.map(col => (
              <th
                key={col.id}
                scope="col"
                className={`col-${col.align}`}
                aria-sort={sort.field === col.id ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <button type="button" className="sort-btn" onClick={() => toggle(col.id)}>
                  <span>{col.label}</span>
                  <SortIndicator field={col.id} current={sort} />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(country => {
            const isFav = favorites.includes(country.code.toUpperCase());

            return (
              <tr
                onClick={() => openCountry(country.code)}
                className={`countries-table__row ${isFav ? 'countries-table__row--favorite' : ''}`}
                role="button"
                tabIndex={0}
                key={`${country.code}::${country.name}`}
              >
                <td className="col-fav" onClick={e => e.stopPropagation()}>
                  <FavoriteToggle country={country} code={country.code} countryName={country.name} />
                </td>
                <td className="col-flag" aria-label={country.name}>
                  <span className="flag-emoji" role="img" aria-hidden="true">
                    {country.flagEmoji || '🏳️'}
                  </span>
                </td>
                <td className="col-left">
                  <div className="cell-primary">
                    {country.name}
                    {isFav ? <span className="fav-inline-badge">★ Favorite</span> : null}
                  </div>
                  <div className="cell-sub">{country.code}</div>
                </td>
                <td className="col-left">{country.capital}</td>
                <td className="col-left">
                  <span className="chip chip--small">{country.region}</span>
                </td>
                <td className="col-right num">{formatCompact(country.population)}</td>
                <td className="col-right num">{formatArea(country.areaKm2)}</td>
                <td className="col-right num">{formatDensity(density(country))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="table-footer">
        Showing <strong>{sorted.length}</strong> of <strong>{countries.length}</strong> countries · sorted by <strong>{sort.field}</strong> ({sort.direction === 'asc' ? 'ascending' : 'descending'})
      </p>
    </div>
  );
};