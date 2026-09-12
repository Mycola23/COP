import { useMemo, useState } from 'react';
import { formatCompact } from '@/lib/format';
import type { CountrySummary } from '@/types/dashboard';

export type SortField = 'name' | 'capital' | 'region' | 'population' | 'area' | 'density';
export type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

interface CountriesTableProps {
  countries: readonly CountrySummary[];
}

const COLUMNS: { id: SortField; label: string; align: 'left' | 'right' }[] = [
  { id: 'name', label: 'Country', align: 'left' },
  { id: 'capital', label: 'Capital', align: 'left' },
  { id: 'region', label: 'Region', align: 'left' },
  { id: 'population', label: 'Population', align: 'right' },
  { id: 'area', label: 'Area', align: 'right' },
  { id: 'density', label: 'Density', align: 'right' },
];

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

const sortCountries = (source: readonly CountrySummary[], { field, direction }: SortConfig): CountrySummary[] => {
  const copy = [...source];
  const sign = direction === 'asc' ? 1 : -1;

  copy.sort((a, b) => {
    const av = getCellValue(a, field);
    const bv = getCellValue(b, field);
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * sign;
    return String(av).localeCompare(String(bv)) * sign;
  });

  return copy;
};

const density = (c: CountrySummary) => c.population / c.areaKm2;

const formatArea = (km2: number) => `${formatCompact(km2)} km²`;

const formatDensity = (d: number) => {
  if (!isFinite(d) || d === 0) return '—';
  return `${formatCompact(d)} /km²`;
};

const SortIndicator = ({ field, current }: { field: SortField; current: SortConfig }) => {
  if (current.field !== field) return <span className="sort-arrow sort-arrow--idle">⇅</span>;
  return <span className="sort-arrow">{current.direction === 'asc' ? '▲' : '▼'}</span>;
};

export const CountriesTable = ({ countries }: CountriesTableProps) => {
  const [sort, setSort] = useState<SortConfig>({ field: 'population', direction: 'desc' });

  const toggle = (field: SortField) =>
    setSort(prev =>
      prev.field === field
        ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { field, direction: field === 'name' || field === 'capital' || field === 'region' ? 'asc' : 'desc' },
    );

  const sorted = useMemo(() => sortCountries(countries, sort), [countries, sort]);

  return (
    <div className="table-wrap">
      <table className="countries-table" aria-label="Countries">
        <thead>
          <tr>
            <th scope="col" className="col-flag">
              Flag
            </th>
            {COLUMNS.map(col => (
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
          {sorted.map(country => (
            <tr key={country.code}>
              <td className="col-flag" aria-label={country.name}>
                <span className="flag-emoji" role="img" aria-hidden="true">
                  {country.flagEmoji}
                </span>
              </td>
              <td className="col-left">
                <div className="cell-primary">{country.name}</div>
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
          ))}
        </tbody>
      </table>
      <p className="table-footer">
        Showing <strong>{sorted.length}</strong> of <strong>{countries.length}</strong> countries · sorted by <strong>{sort.field}</strong> (
        {sort.direction === 'asc' ? 'ascending' : 'descending'})
      </p>
    </div>
  );
};
