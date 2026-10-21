import type { InputProps } from '@/types';

export const Input = ({ isInvalid = false, className = '', ...props }: InputProps) => (
  <input
    className={`filter-form__input ${isInvalid ? 'is-invalid' : ''} ${className}`.trim()}
    aria-invalid={isInvalid ? true : undefined}
    {...props}
  />
);