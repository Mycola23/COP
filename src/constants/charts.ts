import type { Theme } from '@/types';

export const palette = {
  bar: 'rgba(143, 208, 224, 0.85)',
  barBorder: 'rgba(191, 231, 242, 0.9)',
  regions: ['#8fd0e0', '#2ee6a8', '#f2c14e', '#ff8fa3', '#7fb2ff', '#c792ea'],
} as const;

export const CHART_FAVORITE_COLORS = {
  bg: 'rgba(242, 193, 78, 0.9)',
  border: '#ffd166',
  defaultBg: 'rgba(143, 208, 224, 0.6)',
  defaultBorder: 'rgba(143, 208, 224, 1)',
  lineFill: 'rgba(143, 208, 224, 0.08)',
} as const;

export const axisColors = (theme: Theme): { tick: string; grid: string } =>
  theme === 'dark'
    ? { tick: '#9fb8c4', grid: 'rgba(255,255,255,0.08)' }
    : { tick: '#41606f', grid: 'rgba(16,49,63,0.12)' };