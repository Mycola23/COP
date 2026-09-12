import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import type { Theme } from '@/types/dashboard';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const palette = {
  bar: 'rgba(143, 208, 224, 0.85)',
  barBorder: 'rgba(191, 231, 242, 0.9)',
  regions: ['#8fd0e0', '#2ee6a8', '#f2c14e', '#ff8fa3', '#7fb2ff', '#c792ea'],
} as const;

export const axisColors = (theme: Theme): { tick: string; grid: string } =>
  theme === 'dark' ? { tick: '#9fb8c4', grid: 'rgba(255,255,255,0.08)' } : { tick: '#41606f', grid: 'rgba(16,49,63,0.12)' };
