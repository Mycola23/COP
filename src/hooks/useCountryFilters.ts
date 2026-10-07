import { useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/selectors';
import { setFilters, resetFilters } from '@/store/slices/filtersSlice';
import { DEFAULT_COUNTRY_FILTERS } from '@/constants';
import type { CountryFilters, CountryFiltersForm } from '@/types';

export const useCountryFilters = (): CountryFiltersForm => {
  const dispatch = useAppDispatch();
  const globalFilters = useAppSelector(selectFilters);

  const {
    control,
    reset: formReset,
    formState: { errors, isDirty },
  } = useForm<CountryFilters>({
    defaultValues: globalFilters,
    mode: 'onChange',
  });

  const values = useWatch({ control });
  const hasErrors = Object.keys(errors).length > 0;
  const prevSerializedRef = useRef<string>('');

  useEffect(() => {
    if (!hasErrors && values) {
      const nextFilters: CountryFilters = {
        query: values.query ?? '',
        region: values.region ?? 'all',
        limit: Number(values.limit ?? 0),
        unOnly: Boolean(values.unOnly),
      };

      const serialized = JSON.stringify(nextFilters);
      if (prevSerializedRef.current !== serialized) {
        prevSerializedRef.current = serialized;
        dispatch(setFilters(nextFilters));
      }
    }
  }, [values, hasErrors, dispatch]);

  const handleReset = () => {
    formReset(DEFAULT_COUNTRY_FILTERS);
    prevSerializedRef.current = JSON.stringify(DEFAULT_COUNTRY_FILTERS);
    dispatch(resetFilters());
  };

  return {
    control,
    errors,
    appliedFilters: globalFilters,
    isDirty,
    reset: handleReset,
  };
};