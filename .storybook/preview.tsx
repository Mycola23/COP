import type { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#06191f' },
        { name: 'light', value: '#f2c14e' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.backgrounds?.value === '#f2c14e' ? 'light' : 'dark';
      return (
        <MemoryRouter>
          <div className="app-shell" data-theme={theme} style={{ minHeight: 'auto', padding: '24px' }}>
            <Story />
          </div>
        </MemoryRouter>
      );
    },
  ],
};

export default preview;