import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { DEFAULT_COUNTRY_FILTERS } from '@/constants';
import type { CountryFilters, CountryFiltersForm } from '@/types';

export const useCountryFilters = (): CountryFiltersForm => {
  const { control, reset, formState } = useForm<CountryFilters>({
    defaultValues: DEFAULT_COUNTRY_FILTERS,
    mode: 'onChange',
  });

  const values = useWatch({ control });
  const { errors, isDirty } = formState;
  const hasErrors = Object.keys(errors).length > 0;

  const appliedFilters = useMemo<CountryFilters>(() => {
    if (hasErrors || !values) {
      return DEFAULT_COUNTRY_FILTERS;
    }
    return values as CountryFilters;
  }, [values, hasErrors]);

  return {
    control,
    errors,
    appliedFilters,
    isDirty,
    reset,
  };
};