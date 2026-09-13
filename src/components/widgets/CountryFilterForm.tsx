import { isDefaultFilters, LIMIT_OPTIONS, REGION_OPTIONS } from '@/lib/filters';
import type { CountryFilters } from '@/types/dashboard';

interface CountryFilterFormProps {
  value: CountryFilters;
  onChange: (next: CountryFilters) => void;
  onReset: () => void;
}

export const CountryFilterForm = ({ value, onChange, onReset }: CountryFilterFormProps) => {
  const set = <K extends keyof CountryFilters>(key: K, next: CountryFilters[K]): void => onChange({ ...value, [key]: next });

  return (
    <form className="filter-form" aria-label="Country filters" onSubmit={event => event.preventDefault()}>
      <label className="filter-form__label" htmlFor="filter-query">
        Search
      </label>
      <input
        id="filter-query"
        className="filter-form__input"
        type="search"
        placeholder="Name, capital, code…"
        value={value.query}
        onChange={event => set('query', event.target.value)}
      />

      <label className="filter-form__label" htmlFor="filter-region">
        Region
      </label>
      <select id="filter-region" className="filter-form__select" value={value.region} onChange={event => set('region', event.target.value)}>
        {REGION_OPTIONS.map(region => (
          <option key={region} value={region}>
            {region === 'all' ? 'All regions' : region}
          </option>
        ))}
      </select>

      <label className="filter-form__label" htmlFor="filter-limit">
        Row limit
      </label>
      <select
        id="filter-limit"
        className="filter-form__select"
        value={String(value.limit)}
        onChange={event => set('limit', Number(event.target.value))}
      >
        {LIMIT_OPTIONS.map(limit => (
          <option key={limit} value={String(limit)}>
            {limit === 0 ? 'All (paginated)' : `Top ${limit}`}
          </option>
        ))}
      </select>

      <label className="filter-form__check" htmlFor="filter-un">
        <input id="filter-un" type="checkbox" checked={value.unOnly} onChange={event => set('unOnly', event.target.checked)} />
        <span>UN members only</span>
      </label>

      <button type="button" className="filter-form__reset" onClick={onReset} disabled={isDefaultFilters(value)}>
        Reset filters
      </button>
    </form>
  );
};
