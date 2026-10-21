import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel } from './FilterPanel';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/Button';

const meta: Meta<typeof FilterPanel> = {
  title: 'Design System/Organisms/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

export const CompleteFilterPanel: Story = {
  render: () => (
    <FilterPanel ariaLabel="Interactive filters">
      <FormField id="filter-search" label="Search">
        <Input id="filter-search" placeholder="Name, capital, code…" />
      </FormField>

      <FormField id="filter-region-sb" label="Region">
        <Select
          id="filter-region-sb"
          options={[
            { value: 'all', label: 'All regions' },
            { value: 'Africa', label: 'Africa' },
            { value: 'Americas', label: 'Americas' },
            { value: 'Asia', label: 'Asia' },
            { value: 'Europe', label: 'Europe' },
            { value: 'Oceania', label: 'Oceania' },
          ]}
          defaultValue="all"
        />
      </FormField>

      <FormField id="filter-limit-sb" label="Row limit">
        <Select
          id="filter-limit-sb"
          options={[
            { value: '0', label: 'All (paginated)' },
            { value: '10', label: 'Top 10' },
            { value: '25', label: 'Top 25' },
          ]}
          defaultValue="10"
        />
      </FormField>

      <label className="filter-form__check">
        <input type="checkbox" defaultChecked />
        <span>UN members only</span>
      </label>

      <Button variant="reset" disabled={false}>
        Reset filters
      </Button>
    </FilterPanel>
  ),
};