import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CountryFilterForm } from '@/components/widgets/CountryFilterForm';
import { Route, Routes } from 'react-router-dom';
import { CountryDetailsPage } from './pages/CountryDetailsPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFound';
import { CountriesPage } from './pages/CountriesPage';

export default function App() {
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
