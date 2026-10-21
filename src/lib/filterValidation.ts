import type { RegisterOptions } from 'react-hook-form';
import { LIMIT_OPTIONS, REGION_OPTIONS } from '@/constants';
import type { CountryFilters } from '@/types';

export const QUERY_RULES: RegisterOptions<CountryFilters, 'query'> = {
  maxLength: { value: 40, message: 'Keep the search under 40 characters' },
  validate: (value: string) =>
    value.trim() === '' ||
    value.trim().length >= 2 ||
    'Search needs at least 2 characters',
};

export const REGION_RULES: RegisterOptions<CountryFilters, 'region'> = {
  required: 'Region is required',
  validate: (value: string) =>
    (REGION_OPTIONS as readonly string[]).includes(value) || 'Pick a region from the list',
};

export const LIMIT_RULES: RegisterOptions<CountryFilters, 'limit'> = {
  validate: (value: number) =>
    (LIMIT_OPTIONS as readonly number[]).includes(value) || 'Pick one of the limit presets',
};