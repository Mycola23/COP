import type { TableColumn } from '@/types';

export const TABLE_COLUMNS: readonly TableColumn[] = [
  { id: 'name', label: 'Country', align: 'left' },
  { id: 'capital', label: 'Capital', align: 'left' },
  { id: 'region', label: 'Region', align: 'left' },
  { id: 'population', label: 'Population', align: 'right' },
  { id: 'area', label: 'Area', align: 'right' },
  { id: 'density', label: 'Density', align: 'right' },
] as const;