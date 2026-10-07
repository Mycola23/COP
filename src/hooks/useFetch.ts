import { FetchResult } from '@/types/hooks';
import { useEffect, useState } from 'react';

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>
): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    fetcher(controller.signal)
      .then(result => {
        if (!ignore) {
          setData(result);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (ignore || (err instanceof Error && err.name === 'AbortError')) return;
        
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [fetcher]);

  return { data, loading, error };
}