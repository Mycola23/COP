import type { Meta, StoryObj } from '@storybook/react';
import { StateView } from './StateView';

const meta: Meta<typeof StateView> = {
  title: 'Design System/Molecules/StateView',
  component: StateView,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['loading', 'empty', 'error', 'notFound'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StateView>;

export const Loading: Story = {
  args: {
    type: 'loading',
    title: 'All that we do load load load data',
    subtitle: 'Fetching live data from restcountries.com',
  },
};

export const Empty: Story = {
  args: {
    type: 'empty',
    title: 'No countries returned',
    subtitle: 'The API responded with an empty dataset, maybe you find luck next time.',
  },
};

export const ErrorState: Story = {
  args: {
    type: 'error',
    title: 'Failed to load countries',
    subtitle: '429 Too Many Requests: Rate limit exceeded',
    actionText: 'Retry',
    onAction: () => alert('Retry triggered!'),
  },
};

export const NotFound: Story = {
  args: {
    type: 'notFound',
    title: "We couldn't locate this country.",
    subtitle: 'Try going back and picking another row, or check the URL.',
    customIcon: '∅',
  },
};