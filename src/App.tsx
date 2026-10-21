/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CountryFilterForm } from '@/components/widgets/CountryFilterForm';
import { MainPage } from '@/pages/MainPage';
import { CountriesPage } from '@/pages/CountriesPage';
import { CountryDetailsPage } from '@/pages/CountryDetailsPage';
import { NotFoundPage } from '@/pages/NotFound';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/selectors/index';
import { fetchCountriesThunk } from '@/store/slices/countriesSlice';
import { useDebounce } from '@/hooks/useDebounce';

export default function App() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const debouncedQuery = useDebounce(filters.query.trim(), 400);

  useEffect(() => {
    const promise = dispatch(
      fetchCountriesThunk({
        ...filters,
        query: debouncedQuery,
      })
    );
    return () => {
      promise.abort();
    };
  }, [debouncedQuery, filters.region, filters.limit, filters.unOnly]);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar>
          <CountryFilterForm />
        </Sidebar>
      }
      header={<Header />}
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/country/:code" element={<CountryDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DashboardLayout>
  );
}