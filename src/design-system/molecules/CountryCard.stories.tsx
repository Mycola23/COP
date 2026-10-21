import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '@/store';
import { CountryCard } from './CountryCard';
import type { CountrySummary } from '@/types';

const sampleCountry: CountrySummary = {
  code: 'UKR',
  name: 'Ukraine',
  flagEmoji: '🇺🇦',
  flagDescription: 'Two equal horizontal bands of blue and yellow.',
  region: 'Europe',
  subregion: 'Eastern Europe',
  capital: 'Kyiv',
  population: 43000000,
  areaKm2: 603500,
  currencyCodes: ['UAH'],
  languageNames: ['Ukrainian'],
  isUnMember: true,
  landlocked: false,
  timezoneCount: 1,
  timezones: ['UTC+02:00'],
  borders: ['POL', 'SVK', 'HUN', 'ROU', 'MDA', 'BLR', 'RUS'],
  memberships: { un: true },
  links: {},
  carsDrivingSide: 'right',
};

const meta: Meta<typeof CountryCard> = {
  title: 'Design System/Molecules/CountryCard',
  component: CountryCard,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <div style={{ maxWidth: '280px' }}>
            <Story />
          </div>
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CountryCard>;

export const Default: Story = {
  args: {
    country: sampleCountry,
    isFavorite: false,
  },
};

export const FavoriteHighlighted: Story = {
  args: {
    country: sampleCountry,
    isFavorite: true,
  },
};