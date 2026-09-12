import { GlassCard } from '@/components/ui/GlassCard';
import { CountriesTable } from '@/components/widgets/CountriesTable';
import { Empty } from '@/components/ui/Empty';
import { Error } from '@/components/ui/Error';
import { Loader } from '@/components/ui/Loader';
import { useData } from '@/hooks/useData';

export const CountriesDashboard = () => {
  const { status, data, error } = useData();

  const retry = () => {
    window.location.reload();
  };

  if (status === 'loading' || status === 'idle') {
    return (
      <GlassCard title="Countries" subtitle="fetching live data">
        <Loader />
      </GlassCard>
    );
  }

  if (status === 'error') {
    return (
      <GlassCard title="Countries" subtitle="request failed">
        <Error message={error ?? 'Unknown error'} onRetry={retry} />
      </GlassCard>
    );
  }

  if (status === 'empty') {
    return (
      <GlassCard title="Countries" subtitle="no records">
        <Empty />
      </GlassCard>
    );
  }

  return (
    <GlassCard title="Countries" subtitle="live data from restcountries.com">
      <CountriesTable countries={data} />
    </GlassCard>
  );
};
