/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from 'react';

export interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(key: string, fetcher: (signal: AbortSignal) => Promise<T>): FetchResult<T> {
  const [state, setState] = useState<FetchResult<T>>({ data: null, loading: true, error: null });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    const controller = new AbortController();
    setState(prev => ({ ...prev, loading: true, error: null }));

    fetcherRef
      .current(controller.signal)
      .then(data => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted || (err as { name?: string })?.name === 'AbortError') return;
        setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Unknown error' });
      });

    return () => controller.abort();
  }, [key]);

  return state;
}
