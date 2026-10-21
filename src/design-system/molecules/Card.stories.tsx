import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

const meta: Meta<typeof Card> = {
  title: 'Design System/Molecules/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const BasicCard: Story = {
  args: {
    children: <p style={{ margin: 0, color: 'var(--text)' }}>Простий контент картки з ефектом скла (Glassmorphism).</p>,
  },
};

export const WithHeaderAndSubtitle: Story = {
  args: {
    title: 'Countries directory',
    subtitle: 'Click a row to open details or star to favorite',
    children: <p style={{ margin: 0, color: 'var(--muted)' }}>Тіло картки містить таблицю або графіки дашборду.</p>,
  },
};

export const WithActionBadge: Story = {
  args: {
    title: 'Explore Countries',
    subtitle: 'Current live selection',
    actions: <Badge variant="accent">250 countries</Badge>,
    children: <p style={{ margin: 0, color: 'var(--text)' }}>Вміст з бейджем кількості елементів у правому верхньому кутку.</p>,
  },
};

export const WithActionButtons: Story = {
  args: {
    title: 'Top Countries by Population',
    subtitle: 'Ranked list',
    actions: (
      <div style={{ display: 'flex', gap: '4px' }}>
        <Button variant="ghost" size="sm" isActive>📊 Bar</Button>
        <Button variant="ghost" size="sm">📈 Line</Button>
      </div>
    ),
    children: <div style={{ height: '140px', display: 'grid', placeItems: 'center', color: 'var(--muted)' }}>[Chart Area]</div>,
  },
};