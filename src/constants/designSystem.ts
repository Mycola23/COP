import type { ButtonVariant, BadgeVariant, ComponentSize } from '@/types';

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'ds-btn--primary',
  ghost: 'ds-btn--ghost',
  control: 'ds-btn--control',
  reset: 'filter-form__reset',
  fav: 'fav-btn',
};

export const BUTTON_SIZES: Record<ComponentSize, string> = {
  sm: 'ds-btn--sm',
  md: 'ds-btn--md',
  lg: 'ds-btn--lg',
};

export const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  default: 'chip',
  accent: 'chip chip--accent',
  muted: 'chip chip--muted',
  fav: 'fav-inline-badge',
  link: 'chip chip--link',
};

export const STATE_ICONS = {
  loading: '⏳',
  empty: '∅',
  error: '⚠',
  notFound: '🔍',
} as const;