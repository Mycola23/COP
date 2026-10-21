import type { SpinnerProps } from '@/types';

export const Spinner = ({ className = '' }: SpinnerProps) => (
  <div className={`spinner ${className}`.trim()} aria-hidden="true" />
);