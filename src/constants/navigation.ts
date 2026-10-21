import type { NavItem } from '@/types';

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', icon: '▦', to: '/', end: true },
  { label: 'Countries', icon: '🌐', to: '/countries' },
] as const;