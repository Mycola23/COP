import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const sampleOptions = [
  { value: 'all', label: 'All regions' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];

const meta: Meta<typeof Select> = {
  title: 'Design System/Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    isInvalid: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Regions: Story = {
  args: {
    options: sampleOptions,
    defaultValue: 'all',
  },
};

export const RowLimits: Story = {
  args: {
    options: [
      { value: '0', label: 'All (paginated)' },
      { value: '10', label: 'Top 10' },
      { value: '25', label: 'Top 25' },
      { value: '50', label: 'Top 50' },
    ],
    defaultValue: '10',
  },
};

export const Invalid: Story = {
  args: {
    options: sampleOptions,
    isInvalid: true,
  },
};