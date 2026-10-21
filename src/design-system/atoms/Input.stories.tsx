import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    isInvalid: {
      control: 'boolean',
      description: 'Позначає поле як невалідне (червона рамка)',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Name, capital, code…',
    isInvalid: false,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Ukraine',
    placeholder: 'Name, capital, code…',
  },
};

export const Invalid: Story = {
  args: {
    value: 'u',
    isInvalid: true,
    placeholder: 'Name, capital, code…',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled input',
    disabled: true,
  },
};