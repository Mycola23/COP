import type { BadgeProps } from '@/types';
import { BADGE_VARIANTS } from '@/constants';

export const Badge = ({ variant = 'default', size = 'md', children, className = '', onClick }: BadgeProps) => {
  const variantClass = BADGE_VARIANTS[variant] || BADGE_VARIANTS.default;
  const sizeClass = size === 'sm' ? 'chip--small' : '';

  return (
    <span className={`${variantClass} ${sizeClass} ${className}`.trim()} onClick={onClick}>
      {children}
    </span>
  );
};