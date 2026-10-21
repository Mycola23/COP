import type { FormFieldProps } from '@/types';

export const FormField = ({ id, label, error, children }: FormFieldProps) => (
  <div className="ds-form-field">
    <label className="filter-form__label" htmlFor={id}>
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="filter-form__error" role="alert">
        {error}
      </p>
    )}
  </div>
);