import type { Meta, StoryObj } from '@storybook/react';
import { DeltaBadge } from './DeltaBadge';

const meta: Meta<typeof DeltaBadge> = {
  title: 'Design System/Atoms/DeltaBadge',
  component: DeltaBadge,
  tags: ['autodocs'],
  argTypes: {
    percent: {
      control: 'number',
      description: 'Відсоток зміни (позитивний або негативний)',
    },
    absolute: {
      control: 'text',
      description: 'Додаткове текстове пояснення',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeltaBadge>;

export const PositiveGrowth: Story = {
  args: {
    percent: 21.2,
    absolute: 'Africa: 53 of 250',
  },
};

export const NegativeDrop: Story = {
  args: {
    percent: -7.6,
    absolute: '19 of 250 are non-UN',
  },
};

export const ZeroNeutral: Story = {
  args: {
    percent: 0,
    absolute: 'Equal share',
  },
};

export const WithoutAbsoluteText: Story = {
  args: {
    percent: 14.5,
  },
};