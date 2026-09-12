import { useMemo, useState } from 'react';
import { formatCompact } from '@/lib/format';
import type { CountrySummary } from '@/types/dashboard';

const ALL_REGIONS = 'All regions';

interface FilteredCountryListProps {
  items: CountrySummary[];
}

export const FilteredCountryList = ({ items }: FilteredCountryListProps) => {
  const [region, setRegion] = useState(ALL_REGIONS);

  const regions = useMemo(() => [ALL_REGIONS, ...new Set(items.map(item => item.region))], [items]);
  const visible = useMemo(() => (region === ALL_REGIONS ? items : items.filter(item => item.region === region)), [items, region]);

  return (
    <div className="filtered-list">
      <label className="filtered-list__label" htmlFor="region-filter">
        Region
      </label>
      <select id="region-filter" className="filtered-list__select" value={region} onChange={event => setRegion(event.target.value)}>
        {regions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="filtered-list__meta">
        Showing {visible.length} of {items.length} countries
      </p>
      <ul className="filtered-list__items">
        {visible.map(country => (
          <li key={country.code} className="filtered-list__row">
            <span className="filtered-list__flag" aria-hidden="true">
              {country.flagEmoji}
            </span>
            <span className="filtered-list__name">
              {country.name}
              <small>
                {country.capital} · {country.subregion}
              </small>
            </span>
            <span className="filtered-list__value">{formatCompact(country.population)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
