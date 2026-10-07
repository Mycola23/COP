import { useMemo } from 'react';
import { useForm, useWatch, type Control, type FieldErrors } from 'react-hook-form';
import { DEFAULT_COUNTRY_FILTERS } from '@/lib/filters';
import type { CountryFilters } from '@/types/dashboard';

export interface CountryFiltersForm {
  control: Control<CountryFilters>;
  errors: FieldErrors<CountryFilters>;
  appliedFilters: CountryFilters;
  isDirty: boolean;
  reset: () => void;
}

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