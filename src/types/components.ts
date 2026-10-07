import type { ReactNode } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import type { ChartSeries, CountryFilters, CountrySummary, KpiData, Metric } from './dashboard';

export interface DashboardLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export interface SidebarProps {
  children?: ReactNode;
}

export interface NavItem {
  label: string;
  icon: string;
  to: string;
  end?: boolean;
}

export interface DeltaBadgeProps {
  percent: number;
  absolute?: string;
}

export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export interface GlassCardProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export interface MetricBarChartProps {
  series: ChartSeries;
}

export interface RegionDoughnutChartProps {
  series: ChartSeries;
}

export interface InteractiveMetricChartProps {
  countries: readonly CountrySummary[];
  metric: Metric;
  limit?: number;
}

export interface FavoriteToggleProps {
  country?: CountrySummary;
  code: string;
  countryName?: string;
  className?: string;
}

export type SortField = 'name' | 'capital' | 'region' | 'population' | 'area' | 'density';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface TableColumn {
  id: SortField;
  label: string;
  align: 'left' | 'right';
}

export interface CountriesTableProps {
  countries: readonly CountrySummary[];
}

export interface CountryFilterFormProps {
  control?: Control<CountryFilters>;
  errors?: FieldErrors<CountryFilters>;
  isDirty?: boolean;
  onReset?: () => void;
}

export interface KpiCardProps {
  kpi: KpiData;
}

export interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export interface PageProps {
  appliedFilters?: CountryFilters;
}

export interface MetricOption {
  id: Metric;
  label: string;
}