import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { LIMIT_OPTIONS, REGION_OPTIONS } from '@/lib/filters';
import { LIMIT_RULES, QUERY_RULES, REGION_RULES } from '@/lib/filterValidation';
import type { CountryFilters } from '@/types/dashboard';

interface CountryFilterFormProps {
  control: Control<CountryFilters>;
  errors: FieldErrors<CountryFilters>;
  isDirty: boolean;
  onReset: () => void;
}

export const CountryFilterForm = ({ control, errors, isDirty, onReset }: CountryFilterFormProps) => (
  <form
    className="filter-form"
    aria-label="Country filters"
    noValidate
    onSubmit={(event) => event.preventDefault()}
  >
    <label className="filter-form__label" htmlFor="filter-query">Search</label>
    <Controller
      name="query"
      control={control}
      rules={QUERY_RULES}
      render={({ field }) => (
        <input
          id="filter-query"
          className={`filter-form__input ${errors.query ? 'is-invalid' : ''}`}
          type="search"
          placeholder="Name, capital, code…"
          name={field.name}
          ref={field.ref}
          value={field.value}         
          onChange={field.onChange}   
          onBlur={field.onBlur}
          aria-invalid={errors.query ? true : undefined}
          aria-describedby={errors.query ? 'filter-query-error' : undefined}
        />
      )}
    />
    {errors.query ? (
      <p id="filter-query-error" className="filter-form__error" role="alert">
        {errors.query.message}
      </p>
    ) : null}

    <label className="filter-form__label" htmlFor="filter-region">Region</label>
    <Controller
      name="region"
      control={control}
      rules={REGION_RULES}
      render={({ field }) => (
        <select
          id="filter-region"
          className={`filter-form__select ${errors.region ? 'is-invalid' : ''}`}
          name={field.name}
          ref={field.ref}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          aria-describedby={errors.region ? 'filter-region-error' : undefined}
        >
          {REGION_OPTIONS.map((region) => (
            <option key={region} value={region}>
              {region === 'all' ? 'All regions' : region}
            </option>
          ))}
        </select>
      )}
    />
    {errors.region ? (
      <p id="filter-region-error" className="filter-form__error" role="alert">
        {errors.region.message}
      </p>
    ) : null}

    <label className="filter-form__label" htmlFor="filter-limit">Row limit</label>
    <Controller
      name="limit"
      control={control}
      rules={LIMIT_RULES}
      render={({ field }) => (
        <select
          id="filter-limit"
          className={`filter-form__select ${errors.limit ? 'is-invalid' : ''}`}
          name={field.name}
          ref={field.ref}
          value={String(field.value)}
          onChange={(event) => field.onChange(Number(event.target.value))} 
          onBlur={field.onBlur}
          aria-describedby={errors.limit ? 'filter-limit-error' : undefined}
        >
          {LIMIT_OPTIONS.map((limit) => (
            <option key={limit} value={String(limit)}>
              {limit === 0 ? 'All (paginated)' : `Top ${limit}`}
            </option>
          ))}
        </select>
      )}
    />
    {errors.limit ? (
      <p id="filter-limit-error" className="filter-form__error" role="alert">
        {errors.limit.message}
      </p>
    ) : null}

    <Controller
      name="unOnly"
      control={control}
      render={({ field }) => (
        <label className="filter-form__check" htmlFor="filter-un">
          <input
            id="filter-un"
            type="checkbox"
            name={field.name}
            ref={field.ref}
            checked={field.value}
            onChange={(event) => field.onChange(event.target.checked)}
            onBlur={field.onBlur}
          />
          <span>UN members only</span>
        </label>
      )}
    />

    <button
      type="button"
      className="filter-form__reset"
      onClick={onReset}
      disabled={!isDirty}   
    >
      Reset filters
    </button>
  </form>
);