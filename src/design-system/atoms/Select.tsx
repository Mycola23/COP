import type { SelectProps } from '@/types';

export const Select = ({ options, isInvalid = false, className = '', ...props }: SelectProps) => (
  <select
    className={`filter-form__select ${isInvalid ? 'is-invalid' : ''} ${className}`.trim()}
    aria-invalid={isInvalid ? true : undefined}
    {...props}
  >
    {options.map(opt => (
      <option key={opt.value} value={String(opt.value)}>
        {opt.label}
      </option>
    ))}
  </select>
);