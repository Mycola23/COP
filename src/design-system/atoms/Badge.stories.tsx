import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'muted', 'fav', 'link'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Europe',
    variant: 'default',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Americas',
    variant: 'default',
    size: 'sm',
  },
};

export const Accent: Story = {
  args: {
    children: 'USD',
    variant: 'accent',
  },
};

export const Muted: Story = {
  args: {
    children: 'Landlocked, no neighbours',
    variant: 'muted',
  },
};

export const FavoriteBadge: Story = {
  args: {
    children: '★ Favorite',
    variant: 'fav',
  },
};

export const LinkBadge: Story = {
  args: {
    children: 'POL ↗',
    variant: 'link',
  },
};