import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import type { CountrySummary, Theme } from './dashboard';

export type ComponentSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'ghost' | 'control' | 'reset' | 'fav';
export type BadgeVariant = 'default' | 'accent' | 'muted' | 'fav' | 'link';
export type StateType = 'loading' | 'empty' | 'error' | 'notFound';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ComponentSize;
  isActive?: boolean;
  icon?: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
  isInvalid?: boolean;
}

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
}

export interface SpinnerProps {
  size?: ComponentSize;
  className?: string;
}

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export interface CardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface StateViewProps {
  type: StateType;
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  customIcon?: ReactNode;
}

export interface DescriptionItem {
  label: string;
  value: ReactNode;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  className?: string;
}

export interface ColumnDefinition<T> {
  id: string;
  header: ReactNode;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  className?: string;
  render?: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  data: readonly T[];
  columns: readonly ColumnDefinition<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  rowClassName?: (item: T) => string;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  footerText?: ReactNode;
  ariaLabel?: string;
}

export interface FilterPanelProps {
  children: ReactNode;
  onSubmit?: React.SubmitEventHandler<HTMLFormElement>;
  ariaLabel?: string;
  className?: string;
}

export interface CountryCardProps {
  country: CountrySummary;
  isFavorite?: boolean;
  className?: string;
}

export interface AppShellProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  theme?: Theme;
}