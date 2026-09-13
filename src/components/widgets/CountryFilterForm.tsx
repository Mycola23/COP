import { useFilters } from '@/context/FiltersContext';
import { isDefaultFilters, LIMIT_OPTIONS, REGION_OPTIONS } from '@/lib/filters';

export const CountryFilterForm = () => {
  const { filters, setFilters, resetFilters } = useFilters();

  const set = <K extends keyof typeof filters>(key: K, next: (typeof filters)[K]): void => setFilters({ ...filters, [key]: next });

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
        value={filters.query}
        onChange={event => set('query', event.target.value)}
      />

      <label className="filter-form__label" htmlFor="filter-region">
        Region
      </label>
      <select id="filter-region" className="filter-form__select" value={filters.region} onChange={event => set('region', event.target.value)}>
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
        value={String(filters.limit)}
        onChange={event => set('limit', Number(event.target.value))}
      >
        {LIMIT_OPTIONS.map(limit => (
          <option key={limit} value={String(limit)}>
            {limit === 0 ? 'All (paginated)' : `Top ${limit}`}
          </option>
        ))}
      </select>

      <label className="filter-form__check" htmlFor="filter-un">
        <input id="filter-un" type="checkbox" checked={filters.unOnly} onChange={event => set('unOnly', event.target.checked)} />
        <span>UN members only</span>
      </label>

      <button type="button" className="filter-form__reset" onClick={resetFilters} disabled={isDefaultFilters(filters)}>
        Reset filters
      </button>
    </form>
  );
};
