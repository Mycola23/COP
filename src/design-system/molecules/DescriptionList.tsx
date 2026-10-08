import type { DescriptionListProps } from '@/types';

export const DescriptionList = ({ items, className = '' }: DescriptionListProps) => (
  <dl className={`details-dl ${className}`.trim()}>
    {items.map(({ label, value }) => (
      <div key={label} style={{ display: 'contents' }}>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>
    ))}
  </dl>
);