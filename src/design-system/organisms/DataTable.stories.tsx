import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import type { ColumnDefinition } from '@/types';

interface DemoItem {
  code: string;
  name: string;
  region: string;
  population: number;
}

const demoColumns: ColumnDefinition<DemoItem>[] = [
  { id: 'code', header: 'Code', align: 'center', className: 'col-flag' },
  { id: 'name', header: 'Country', sortable: true, align: 'left' },
  { id: 'region', header: 'Region', sortable: true, align: 'left' },
  {
    id: 'population',
    header: 'Population',
    align: 'right',
    sortable: true,
    className: 'num',
    render: item => item.population.toLocaleString(),
  },
];

const demoData: DemoItem[] = [
  { code: 'UKR', name: 'Ukraine', region: 'Europe', population: 43000000 },
  { code: 'FRA', name: 'France', region: 'Europe', population: 67500000 },
  { code: 'JPN', name: 'Japan', region: 'Asia', population: 125000000 },
  { code: 'CAN', name: 'Canada', region: 'Americas', population: 38250000 },
];

const meta: Meta<typeof DataTable<DemoItem>> = {
  title: 'Design System/Organisms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<DemoItem>>;

export const DefaultTable: Story = {
  args: {
    data: demoData,
    columns: demoColumns,
    keyExtractor: item => item.code,
    sortField: 'population',
    sortDirection: 'desc',
    footerText: 'Showing 4 of 4 countries',
  },
};

export const SortedAscending: Story = {
  args: {
    data: [...demoData].sort((a, b) => a.name.localeCompare(b.name)),
    columns: demoColumns,
    keyExtractor: item => item.code,
    sortField: 'name',
    sortDirection: 'asc',
    footerText: 'Sorted by name (ascending)',
  },
};