import type { FilterPanelProps } from '@/types';

export const FilterPanel = ({
  children,
  onSubmit = e => e.preventDefault(),
  ariaLabel = 'Filter panel',
  className = '',
}: FilterPanelProps) => (
  <form
    className={`filter-form ${className}`.trim()}
    aria-label={ariaLabel}
    noValidate
    onSubmit={onSubmit}
  >
    {children}
  </form>
);