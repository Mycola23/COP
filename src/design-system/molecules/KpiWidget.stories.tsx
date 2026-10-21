import type { Meta, StoryObj } from '@storybook/react';
import { KpiWidget } from './KpiWidget';

const meta: Meta<typeof KpiWidget> = {
  title: 'Design System/Molecules/KpiWidget',
  component: KpiWidget,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KpiWidget>;

export const TrackedCountries: Story = {
  args: {
    kpi: {
      id: 'tracked',
      title: 'Countries tracked',
      value: '250',
      deltaPercent: 21.2,
      deltaAbsolute: 'Africa: 53 of 250',
      hint: 'largest region share of the selection',
    },
  },
};

export const TotalPopulation: Story = {
  args: {
    kpi: {
      id: 'population',
      title: 'Total population',
      value: '8.0B',
      deltaPercent: 17.8,
      deltaAbsolute: 'India: 1.4B of 8.0B',
      hint: 'top-1 country concentration',
    },
  },
};

export const DensitySkew: Story = {
  args: {
    kpi: {
      id: 'density',
      title: 'Avg density',
      value: '448.2 /km²',
      deltaPercent: -12.4,
      deltaAbsolute: 'median 91 vs mean 448.2 /km²',
      hint: 'median-vs-mean skew of density',
    },
  },
};