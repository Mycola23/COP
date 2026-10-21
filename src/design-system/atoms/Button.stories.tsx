import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['control', 'primary', 'ghost', 'reset', 'fav'],
      description: 'Візуальний стиль кнопки',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Розмір кнопки',
    },
    isActive: {
      control: 'boolean',
      description: 'Активний стан (для табів/перемикачів)',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокування кнопки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultControl: Story = {
  args: {
    children: 'Control Button',
    variant: "primary",
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Action',
    variant: 'primary',
    size: 'md',
  },
};

export const ActiveTab: Story = {
  args: {
    children: '📊 Bar Chart',
    variant: 'ghost',
    isActive: true,
    size: 'sm',
  },
};

export const InactiveTab: Story = {
  args: {
    children: '📈 Line Chart',
    variant: 'ghost',
    isActive: false,
    size: 'sm',
  },
};

export const ResetButton: Story = {
  args: {
    children: 'Reset filters',
    variant: 'reset',
    disabled: false,
  },
};

export const ResetButtonDisabled: Story = {
  args: {
    children: 'Reset filters',
    variant: 'reset',
    disabled: true,
  },
};

export const FavoriteActive: Story = {
  args: {
    children: '★',
    variant: 'fav',
    isActive: true,
    className: 'fav-btn--active',
  },
};

export const FavoriteInactive: Story = {
  args: {
    children: '☆',
    variant: 'fav',
    isActive: false,
  },
};