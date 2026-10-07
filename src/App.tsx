import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CountryFilterForm } from '@/components/widgets/CountryFilterForm';
import { Route, Routes } from 'react-router-dom';
import { CountryDetailsPage } from './pages/CountryDetailsPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFound';
import { CountriesPage } from './pages/CountriesPage';
import { useCountryFilters } from './hooks/useCountryFilters';


export default function App() {
  const { control, errors, isDirty, reset, appliedFilters } = useCountryFilters();
  return (
    <DashboardLayout
      sidebar={
        <Sidebar>
          <CountryFilterForm
            control={control}
            errors={errors}
            isDirty={isDirty}
            onReset={reset}
          />
        </Sidebar>
      }
      header={<Header />}
    >
      <Routes>
        <Route path="/" element={<MainPage appliedFilters={appliedFilters} />} />
        <Route path="/countries" element={<CountriesPage appliedFilters={appliedFilters}  />} />
        <Route path="/country/:code" element={<CountryDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DashboardLayout>
  );
}
