import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Design System/Molecules/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Dark: Story = {
  args: {
    isDark: true,
    onToggle: () => {},
  },
};

export const Light: Story = {
  args: {
    isDark: false,
    onToggle: () => {},
  },
};

export const InteractiveState: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(true);
    return <ThemeToggle isDark={isDark} onToggle={() => setIsDark(prev => !prev)} />;
  },
};