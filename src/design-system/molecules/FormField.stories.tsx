import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';

const meta: Meta<typeof FormField> = {
  title: 'Design System/Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const DefaultInput: Story = {
  args: {
    id: 'country-search',
    label: 'Search',
    children: <Input id="country-search" placeholder="Type country name..." />,
  },
};

export const WithValidationError: Story = {
  args: {
    id: 'search-error',
    label: 'Search Query',
    error: 'Search needs at least 2 characters',
    children: <Input id="search-error" value="u" isInvalid />,
  },
};

export const WithSelectDropdown: Story = {
  args: {
    id: 'region-select',
    label: 'Region',
    children: (
      <Select
        id="region-select"
        options={[
          { value: 'all', label: 'All regions' },
          { value: 'Europe', label: 'Europe' },
          { value: 'Asia', label: 'Asia' },
        ]}
      />
    ),
  },
};